```
issue_number=13
gh issue view $issue_number \
  --json=body \
  --jq '.body' |
  node scripts/count_flakes.js > $issue_number.csv

graph ${issue_number}.csv -x 'date' -y 'count' -o ${issue_number}.png --xtick-angle=90
```
