---
description: Create a conventional commit message and commit staged changes
---

Generate a git commit message that strictly follows the Conventional Commits specification. The message should clearly indicate the type of change (e.g., feat, fix, chore, docs, style, refactor, perf, test) and provide a concise description of the change.

### Examples

- feat(agreements-overview): add component to display logs
- fix(user-auth): correct login validation error
- chore(dependencies): update package versions
- docs(api): clarify endpoint usage
- style(button): improve button styling
- refactor(user-service): streamline user data handling
- perf(image-loading): enhance image loading performance
- test(auth): add tests for authentication module

### Requirements

- Your entire response will be passed directly into git commit. Please return only the commit message followint commit_template without any additional information or explanations.
- Header must not be longer than 72 characters
- Body must not be longer than 100 characters per line
- The commit message must follow the commit template:
- subject must not be sentence-case, start-case, pascal-case, upper-case [subject-case]
- Commit only files that are already staged.

### Template

```text
[type][optional scope]: [description]

[optional body]

[optional footer(s)]
```

Shell output:

\*! git commit -m "$ARGUMENTS"
