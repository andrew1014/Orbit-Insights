# Engineering Notes

Design decisions and failure handling for the Orbit Insights pipeline. Kept separate from the
README so the front page can stay a summary; this is the detail for anyone who wants it.

---

## Reliability

### Idempotency guard

The weekly job was originally re-runnable with no guard. A retry after a transient failure
fired the full sequence a second time: it published a duplicate post and sent a second
campaign to the entire subscriber list.

Step 0 of the job is now an idempotency check. It looks for today's post and campaign
**before** writing anything, and exits cleanly if either already exists. The general rule:
any recurring job operating on dated content will eventually double-fire. The only question
is whether the guard exists when it does.

### Health monitoring

The newsletter stopped sending for a week while the automation reported success. The cause
was not in the application code — it was missing credentials in the execution profile, which
produced an immediate configuration failure on every scheduled run.

Two failure signatures look identical from a scheduler and have unrelated causes:

| Symptom | Cause |
|---------|-------|
| Fired on time, failed instantly | Missing or invalid credentials |
| Interrupted partway through | Host shut down mid-run |

The health check now distinguishes between them, because diagnosing the wrong one costs days.

---

## Integrations

### Email campaign updates

`PUT /campaigns/{id}/content` returns 404 on this account despite being the documented
endpoint. Campaign bodies must be updated via `PUT /campaigns/{id}`, passing the campaign
name and recipient list, while **preserving the template's placeholder tokens**.

Approach: splice new content into the existing wrapper rather than replacing the body. This
is documented in the code so it is never re-probed.

### Credential handling

Credentials live in environment files, never in the repository. Profile-specific credentials
are cloned from the main profile rather than being recreated, because a partially-configured
profile fails in ways that look like application bugs.

---

## Editorial constraints as engineering constraints

These are enforced by the pipeline rather than left to judgement at write time:

- **Length** — default read held to roughly 1,000–1,200 words. Supporting depth collapses into
  expandable sections. A newsletter that arrives too long does not get opened twice.
- **Imagery** — every issue carries an image.
- **Verification** — an image labelled "Starship reentry" turned out to be NOAA satellite
  imagery of a launch plume, and was nearly published under a caption describing something
  that was not in the picture. Every image is now visually verified before captioning.
  Filenames are not evidence.
- **Sourcing** — factual claims are checked against primary sources rather than secondary
  reporting.

---

## Architecture

```
Scheduler ──> Research ──> Draft ──> Verify ──> Publish ──> Deploy ──> Email
   │                                                          │
   └── idempotency guard (exit if today's output exists) ──────┘
```

| Stage | Implementation |
|-------|---------------|
| Scheduling | Cron job on the agent host |
| Research | Web search, cross-checked against primary sources |
| Publishing | Jekyll post + homepage + archive update |
| Deployment | Git push to GitHub Pages over SSH |
| Email | MailerLite API — campaign built and dispatched |
| Assets | GitHub Pages, custom domain via Cloudflare DNS |