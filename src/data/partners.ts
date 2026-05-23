// AUTO-GENERATED partner data
const logos = import.meta.glob("../assets/partners/*.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

function getLogo(type: string, slug: string): string | undefined {
  const key = Object.keys(logos).find((k) => k.endsWith(`/${type}-${slug}.webp`));
  return key ? logos[key] : undefined;
}

export interface PartnerEntry { id: string; name: string; website: string; slug: string; type: "community" | "industry" | "ecosystem"; logo?: string; }

export const allPartners: PartnerEntry[] = [
  { id: "pt1", name: "Lamit Club", website: "https://www.linkedin.com/company/lamit-club", slug: "lamit-club", type: "community", logo: getLogo("community", "lamit-club") },
  { id: "pt2", name: "Devlearn", website: "https://www.linkedin.com/company/devlearn-com/", slug: "devlearn", type: "community", logo: getLogo("community", "devlearn") },
  { id: "pt3", name: "Postman Pune", website: "https://www.postmancommunitypune.in/", slug: "postman-pune", type: "community", logo: getLogo("community", "postman-pune") },
  { id: "pt4", name: "The Dev Army", website: "https://thedevarmy.com/", slug: "the-dev-army", type: "community", logo: getLogo("community", "the-dev-army") },
  { id: "pt5", name: "The Ascent Circle", website: "https://ascentcircle.web.app/", slug: "the-ascent-circle", type: "community", logo: getLogo("community", "the-ascent-circle") },
  { id: "pt6", name: "GDGOC UEC", website: "https://www.instagram.com/gdg_uecu/?igsh=MWVpdGp3eWgydjJqcw%3D%3D#", slug: "gdgoc-uec", type: "community", logo: getLogo("community", "gdgoc-uec") },
  { id: "pt7", name: "GDGOC GCET", website: "https://gdg.community.dev/gdg-on-campus-galgotias-college-of-engineering-technology-greater-noida-india/", slug: "gdgoc-gcet", type: "community", logo: getLogo("community", "gdgoc-gcet") },
  { id: "pt8", name: "Apna Coding", website: "https://linkedin.com/company/apna-coding-by-apna-counsellors", slug: "apna-coding", type: "community", logo: getLogo("community", "apna-coding") },
  { id: "pt9", name: "the elites", website: "https://www.linkedin.com/company/the-elites-in/", slug: "the-elites", type: "community", logo: getLogo("community", "the-elites") },
  { id: "pt10", name: "Eventopia", website: "https://eventopia.in/", slug: "eventopia", type: "community", logo: getLogo("community", "eventopia") },
  { id: "pt11", name: "Krowd Kraft", website: "https://krowdkraft.live/join-community", slug: "krowd-kraft", type: "community", logo: getLogo("community", "krowd-kraft") },
  { id: "pt12", name: "Code for india foundation", website: "https://codeforindia.com/", slug: "code-for-india-foundation", type: "community", logo: getLogo("community", "code-for-india-foundation") },
  { id: "pt13", name: "Zairza", website: "https://www.linkedin.com/company/zairza/", slug: "zairza", type: "community", logo: getLogo("community", "zairza") },
  { id: "pt14", name: "Tech leads", website: "https://instagram.com/techleads.in/", slug: "tech-leads", type: "community", logo: getLogo("community", "tech-leads") },
  { id: "pt15", name: "Open Source Chandigarh", website: "https://www.linkedin.com/company/open-source-chandigarh/posts/?feedView=all", slug: "open-source-chandigarh", type: "community", logo: getLogo("community", "open-source-chandigarh") },
  { id: "pt16", name: "Tech Masters India", website: "https://www.linkedin.com/company/techmasters-community/?viewAsMember=true", slug: "tech-masters-india", type: "community", logo: getLogo("community", "tech-masters-india") },
  { id: "pt17", name: "TechXNinjas", website: "https://airtable.com/app94II682K5cg6UB/tblZnO5eIQHBbJoN3/viwC6b7D7b15rkNZl/recEOreKy0xcb9vxA/fldZyX7B4pCytR9g6?copyLinkToCellOrRecordOrigin=gridView", slug: "techxninjas", type: "community", logo: getLogo("community", "techxninjas") },
  { id: "pt18", name: "IEEE CGC", website: "https://airtable.com/app94II682K5cg6UB/tblZnO5eIQHBbJoN3/viwC6b7D7b15rkNZl/recBU6ROhKhpArSQ9/fldZyX7B4pCytR9g6?copyLinkToCellOrRecordOrigin=gridView", slug: "ieee-cgc", type: "community", logo: getLogo("community", "ieee-cgc") },
  { id: "pt19", name: "GDG GCET", website: "https://airtable.com/app94II682K5cg6UB/tblZnO5eIQHBbJoN3/viwC6b7D7b15rkNZl/recdy0AjMiLhZxdyK/fldZyX7B4pCytR9g6?copyLinkToCellOrRecordOrigin=gridView", slug: "gdg-gcet", type: "community", logo: getLogo("community", "gdg-gcet") },
  { id: "pt20", name: "Events Info", website: "https://www.linkedin.com/company/eventsinfo", slug: "events-info", type: "community", logo: getLogo("community", "events-info") },
  { id: "pt21", name: "Cyber X", website: "https://www.instagram.com/cyberx.nashik/#", slug: "cyber-x", type: "community", logo: getLogo("community", "cyber-x") },
  { id: "pt22", name: "Tech Education World", website: "https://sites.google.com/view/techeducation-world", slug: "tech-education-world", type: "community", logo: getLogo("community", "tech-education-world") },
  { id: "pt23", name: "CMX Mohali", website: "https://events.cmxhub.com/mohali/", slug: "cmx-mohali", type: "community", logo: getLogo("community", "cmx-mohali") },
  { id: "pt24", name: "IEEE BVCOE", website: "https://www.ieeebvcoe.in/", slug: "ieee-bvcoe", type: "community", logo: getLogo("community", "ieee-bvcoe") },
  { id: "pt25", name: "Devantra Community", website: "https://www.linkedin.com/company/devantra-community/", slug: "devantra-community", type: "community", logo: getLogo("community", "devantra-community") },
  { id: "pt26", name: "Chain Chapter", website: "https://www.instagram.com/chain_chapter/?igsh=bWd4OGlhZm9lZHZu#", slug: "chain-chapter", type: "community", logo: getLogo("community", "chain-chapter") },
  { id: "pt27", name: "Lenient Tree", website: "https://www.linkedin.com/company/lenient-tree/", slug: "lenient-tree", type: "community", logo: getLogo("community", "lenient-tree") },
  { id: "pt28", name: "Hack Halt", website: "https://linkedin.com/company/hack-halt", slug: "hack-halt", type: "community", logo: getLogo("community", "hack-halt") },
  { id: "pt29", name: "GFG NTC", website: "https://www.linkedin.com/in/geeksforgeeks-ntc/", slug: "gfg-ntc", type: "community", logo: getLogo("community", "gfg-ntc") },
  { id: "pt30", name: "Hackshastra", website: "https://hackshastra.in/", slug: "hackshastra", type: "community", logo: getLogo("community", "hackshastra") },
  { id: "pt31", name: "IBW", website: "https://www.indiablockchainweek.com/", slug: "ibw", type: "community", logo: getLogo("community", "ibw") },
  { id: "pt32", name: "Metamorphosis", website: "https://metamorphosis.octaloop.com/", slug: "metamorphosis", type: "community", logo: getLogo("community", "metamorphosis") },
  { id: "pt33", name: "Technoryx", website: "https://www.instagram.com/technoryx_official?utm_source=qr&igsh=MWwwaDBtZWk5dm9sdg==", slug: "technoryx", type: "community", logo: getLogo("community", "technoryx") },
  { id: "pt34", name: "Highlevel", website: "https://www.gohighlevel.com/", slug: "highlevel", type: "industry", logo: getLogo("industry", "highlevel") },
  { id: "pt35", name: "Civo", website: "https://www.civo.com/", slug: "civo", type: "industry", logo: getLogo("industry", "civo") },
  { id: "pt36", name: "Lovable", website: "https://lovable.dev/", slug: "lovable", type: "industry", logo: getLogo("industry", "lovable") },
  { id: "pt37", name: "Xyz", website: "https://gen.xyz/", slug: "xyz", type: "industry", logo: getLogo("industry", "xyz") },
  { id: "pt38", name: "Hela Labs", website: "https://www.helalabs.com/", slug: "hela-labs", type: "industry", logo: getLogo("industry", "hela-labs") },
  { id: "pt39", name: "Vonage", website: "https://www.vonage.com/", slug: "vonage", type: "industry", logo: getLogo("industry", "vonage") },
  { id: "pt40", name: "Get Fail Safe", website: "https://www.getfailsafe.com/", slug: "get-fail-safe", type: "industry", logo: getLogo("industry", "get-fail-safe") },
  { id: "pt41", name: "Balasmiq", website: "https://balsamiq.com/", slug: "balasmiq", type: "industry", logo: getLogo("industry", "balasmiq") },
  { id: "pt42", name: "TruScholar", website: "https://www.truscholar.io/", slug: "truscholar", type: "industry", logo: getLogo("industry", "truscholar") },
  { id: "pt43", name: "Give my certificate", website: "https://givemycertificate.com/", slug: "give-my-certificate", type: "industry", logo: getLogo("industry", "give-my-certificate") },
  { id: "pt44", name: "Interview Cake", website: "https://www.interviewcake.com/", slug: "interview-cake", type: "industry", logo: getLogo("industry", "interview-cake") },
  { id: "pt45", name: "Interview Buddy", website: "https://interviewbuddy.in/", slug: "interview-buddy", type: "industry", logo: getLogo("industry", "interview-buddy") },
  { id: "pt46", name: "Uni Paws", website: "https://unipaws.com/", slug: "uni-paws", type: "industry", logo: getLogo("industry", "uni-paws") },
  { id: "pt47", name: "Code Crafters", website: "https://codecrafters.io/", slug: "code-crafters", type: "industry", logo: getLogo("industry", "code-crafters") },
  { id: "pt48", name: "Notion", website: "https://www.notion.so/", slug: "notion", type: "industry", logo: getLogo("industry", "notion") },
  { id: "pt49", name: "Woflram", website: "https://www.wolfram.com/", slug: "woflram", type: "industry", logo: getLogo("industry", "woflram") },
  { id: "pt50", name: "Slido", website: "https://www.slido.com/", slug: "slido", type: "industry", logo: getLogo("industry", "slido") },
  { id: "pt51", name: "Welzin", website: "https://www.welzin.com/", slug: "welzin", type: "industry", logo: getLogo("industry", "welzin") },
  { id: "pt52", name: "Darzy ai", website: "https://darzy.ai/", slug: "darzy-ai", type: "industry", logo: getLogo("industry", "darzy-ai") },
  { id: "pt53", name: "Duality AI", website: "https://duality.ai/", slug: "duality-ai", type: "industry", logo: getLogo("industry", "duality-ai") },
  { id: "pt54", name: "She Can Code", website: "https://shecancode.io/", slug: "she-can-code", type: "ecosystem", logo: getLogo("ecosystem", "she-can-code") },
  { id: "pt55", name: "Girls Who ML", website: "https://girlswhoml.com/", slug: "girls-who-ml", type: "ecosystem", logo: getLogo("ecosystem", "girls-who-ml") },
  { id: "pt56", name: "SheBuilds", website: "https://shebuilds.tech/", slug: "shebuilds", type: "ecosystem", logo: getLogo("ecosystem", "shebuilds") },
  { id: "pt57", name: "Gode4GovTech", website: "https://www.code4govtech.in/", slug: "gode4govtech", type: "ecosystem", logo: getLogo("ecosystem", "gode4govtech") },
  { id: "pt58", name: "Dev3Pack", website: "https://dev3pack.xyz", slug: "dev3pack", type: "ecosystem", logo: getLogo("ecosystem", "dev3pack") },
  { id: "pt59", name: "We make Devs", website: "https://wemakedevs.org/", slug: "we-make-devs", type: "ecosystem", logo: getLogo("ecosystem", "we-make-devs") },
  { id: "pt60", name: "Girl Up Coders", website: "https://www.girlup.org/", slug: "girl-up-coders", type: "ecosystem", logo: getLogo("ecosystem", "girl-up-coders") },
  { id: "pt61", name: "Cats in Tech", website: "https://in.linkedin.com/company/cats-in-tech", slug: "cats-in-tech", type: "ecosystem", logo: getLogo("ecosystem", "cats-in-tech") },
  { id: "pt62", name: "Her Dao Nigeria", website: "https://twitter.com/herdaonigeria", slug: "her-dao-nigeria", type: "ecosystem", logo: getLogo("ecosystem", "her-dao-nigeria") },
  { id: "pt63", name: "Minerwa", website: "https://in.linkedin.com/company/minerva-techforum", slug: "minerwa", type: "ecosystem", logo: getLogo("ecosystem", "minerwa") },
  { id: "pt64", name: "IEEE IDGTUW", website: "", slug: "ieee-idgtuw", type: "ecosystem", logo: getLogo("ecosystem", "ieee-idgtuw") },
  { id: "pt65", name: "Code Without Barriers", website: "https://www.linkedin.com/company/code-without-barriers", slug: "code-without-barriers", type: "ecosystem", logo: getLogo("ecosystem", "code-without-barriers") },
  { id: "pt66", name: "Dora Dao", website: "https://www.linkedin.com/company/connectdoradao", slug: "dora-dao", type: "ecosystem", logo: getLogo("ecosystem", "dora-dao") },
  { id: "pt67", name: "Women AI Collective", website: "https://www.linkedin.com/company/women-ai-co/", slug: "women-ai-collective", type: "ecosystem", logo: getLogo("ecosystem", "women-ai-collective") },
];

export const communityPartners = allPartners.filter(p => p.type === "community");
export const industryPartners = allPartners.filter(p => p.type === "industry");
export const ecosystemPartners = allPartners.filter(p => p.type === "ecosystem");