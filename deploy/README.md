# Deploy — donuts.hatch.org

The site is served at **https://donuts.hatch.org** from a private S3 bucket behind
CloudFront (HTTPS), with DNS in the existing `hatch.org` Route 53 zone. This mirrors
how other `*.hatch.org` subdomains (e.g. `art-hanger.hatch.org`) are hosted.

## Live resources (AWS account 443475799582, us-east-1)

| Resource | Value |
|----------|-------|
| S3 bucket | `donuts-hatch-org` (private; public access blocked) |
| CloudFront distribution | `E1TEFD3BYTNZFM` → `d7a0bwajcvgp0.cloudfront.net` |
| Origin Access Control | `E839XOW888UXN` |
| ACM certificate | `arn:aws:acm:us-east-1:443475799582:certificate/4977b243-18ce-4a79-a777-448915d885b8` (CN `donuts.hatch.org`, DNS-validated) |
| Route 53 zone | `Z0793770F5WDI7S6EXHF` (`hatch.org`) — A + AAAA alias `donuts.hatch.org` |

## Push a content update

```bash
./deploy/deploy.sh
```
Syncs the static files to S3 and invalidates the CloudFront cache.

## Files here

- `deploy.sh` — re-runnable content sync + cache invalidation (the everyday command).
- `iam-policy-donuts-deploy.json` — the inline policy attached to the `hatch` IAM
  user (`donuts-deploy`) granting S3 / CloudFront / ACM / Route 53 access for this deploy.
- `cloudfront-distribution.json` — distribution config **template**. Placeholders
  (`CERT_ARN`, `OAC_ID`, `donuts-hatch-org-CALLERREF`) are substituted at create time.
- `bucket-policy.json` — S3 policy **template** allowing only this CloudFront
  distribution (OAC, `AWS:SourceArn`) to read the bucket. `DIST_ARN` substituted at apply time.
- `route53-records.json` — A/AAAA alias change-batch **template** (`CF_DOMAIN` substituted);
  `AliasTarget.HostedZoneId` is the fixed global CloudFront zone `Z2FDTNDATAQYW2`.

## One-time provisioning (for reference / disaster recovery)

1. Attach the IAM policy: `aws iam put-user-policy --user-name hatch --policy-name donuts-deploy --policy-document file://deploy/iam-policy-donuts-deploy.json`
2. Create the private bucket + `put-public-access-block`, then `aws s3 sync` the site.
3. Request the ACM cert (DNS validation), add the validation CNAME to the zone, wait for `ISSUED`.
4. Create the OAC, then the distribution from the template (substituting cert/OAC/caller-ref).
5. Apply the bucket policy (substituting the distribution ARN).
6. UPSERT the Route 53 A/AAAA alias records to the distribution domain.
7. Wait for `Deployed`, then verify HTTPS + content.
