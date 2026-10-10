# Google launch — 10 October 2026

Milan authorised free Google registration for the live customer website and Bhuk Lagla Kitchen. The owner created a Google account using `bhuklagla@outlook.com`, entered the new password, completed phone verification and accepted Google's terms himself. Existing Google/Oven Vibe properties were not changed. No Workspace or advertising plan was purchased.

## Search Console

Property: `https://bhuklagla.github.io/`, URL-prefix type, under the kitchen's Google account. Google supplied `google4298d4229c1cdec8.html`; Milan downloaded it to his Downloads folder. Its actual response is copied unchanged to the website's public root. Keep the file after successful verification because Google periodically rechecks ownership. The build validator checks the exact response and treats it as a verification artifact rather than a complete website page. It is excluded from formatter changes and is not included in the sitemap.

Status: verified owner confirmed in Search Console Settings. The owner completed the final Verify action. The artifact is live with its exact response (HTTP 200), released through PR #4, commit `19a43f575987977af6d7332972fc3f0dfbd94c8a`; Pages run `37991530729` and main checks `37991530767` succeeded.

Both `sitemap.xml` and `sitemap-images.xml` were submitted and accepted, but Google's table still reports **Couldn't fetch**, type Unknown and zero discovered pages. Do not report successful sitemap processing. Robots and all five XML files return HTTP 200 and parse; the homepage's Google live test passed (URL available to Google, page can be indexed). The cause of the sitemap fetch status is unconfirmed.

Indexing requests for home, `/menu/` and `/festivals/` each received Google's **Indexing requested** confirmation and priority crawl queue acceptance. Requests were made once per URL; acceptance is not actual indexing or a ranking guarantee. Private screenshots are outside Git under `../outputs/website-demo`.

## Business Profile

Owner confirmed customer pickup and daily operation, reviewed the map pin and advanced the setup wizard. Exact-name search and the creation wizard's suggested duplicates did not match Bhuk Lagla. No Oven Vibe listing was modified. The owner explicitly confirmed that the permanent Bhuk Lagla sign is **not installed yet**. Verification of this shared pickup listing must wait for actual separate signage and Google's required evidence; do not invent an offset or physical verification.

Phone is authorised only when necessary for Google setup or verification; omit optional public phone fields. Website street address/phone publication remains unchanged during registration. Do not claim the listing is live or verified before Google's actual confirmation.

Use the real business name without promotional keywords, an accurate available food category, the root website and the full menu URL `https://bhuklagla.github.io/menu/`. Avoid invented opening dates, reviews, service areas, health claims and dining facilities. The owner's pickup-discount statement needs clear conditions before an offer is published.

Status: profile created under the kitchen account; customization reached 100%. The management view says **Not publicly visible** and **Get verified**. Saved facts include Pizza Takeaway, the owner-reviewed street address, root website, full menu URL, the factual vegetarian/egg-free description with party enquiries, takeaway and third-party delivery. Hours are saved for all seven days as `11:30–00:00`; Google rounded the entered 23:59 close to midnight, consistent with the source's 12 AM closing note. No special holiday hours, dine-in, service coverage or discounts were invented.

The owner uploaded the approved square mascot-and-name logo after Chrome blocked agent local-file uploads; the Photos panel now shows a saved Logo and Change logo control. Exterior, menu-card and dish photography were left for genuine current business photos. Ads and Workspace upsells were skipped; no paid plan was started. Phone and SMS chat were already present when the owner advanced onboarding; the agent did not add them during customization.

The Google food-ordering provider link editor was also tried with the approved Zomato smart link. Google displayed `An error occurred` and did not save the link. The ordering-link editor says verification is needed before customers can see preferred ordering links. Retry after profile verification; until then the website/menu links remain the known paths.

## Official guidance

- [Google account with an existing email](https://support.google.com/accounts/answer/27441?hl=en)
- [Search Console property setup](https://support.google.com/webmasters/answer/34592?hl=en)
- [Continuing ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en)
- [Business Profile representation and virtual food brands](https://support.google.com/business/answer/3038177?hl=en)
