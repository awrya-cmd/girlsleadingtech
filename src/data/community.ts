import type { Speaker, Event, TeamMember, Mentor, Partner, Testimonial, PersonToFollow, Resource } from "./types";
import { realEvents } from "./events-real";
import spk_aarushi_chottani from "@/assets/speakers/aarushi-chottani.webp";
import spk_aarushi_garg from "@/assets/speakers/aarushi-garg.webp";
import spk_aditi_tiwari from "@/assets/speakers/aditi-tiwari.webp";
import spk_ajitha_sindhe from "@/assets/speakers/ajitha-sindhe.webp";
import spk_akanksha_buchke from "@/assets/speakers/akanksha-buchke.webp";
import spk_akanksha_rani from "@/assets/speakers/akanksha-rani.webp";
import spk_akshay_gautam from "@/assets/speakers/akshay-gautam.webp";
import spk_amandeep_singh from "@/assets/speakers/amandeep-singh.webp";
import spk_ankush_dharkar from "@/assets/speakers/ankush-dharkar.webp";
import spk_anubha_pandey from "@/assets/speakers/anubha-pandey.webp";
import spk_anushka_priyadarshi from "@/assets/speakers/anushka-priyadarshi.webp";
import spk_anushka_srivastava from "@/assets/speakers/anushka-srivastava.webp";
import spk_aprajita_verma from "@/assets/speakers/aprajita-verma.webp";
import spk_ayush_chugh from "@/assets/speakers/ayush-chugh.webp";
import spk_ayush_kumar_prajapati from "@/assets/speakers/ayush-kumar-prajapati.webp";
import spk_bhagyasrie_m_masorkar from "@/assets/speakers/bhagyasrie-m-masorkar.webp";
import spk_bhavana_issar from "@/assets/speakers/bhavana-issar.webp";
import spk_bobbie_carlton from "@/assets/speakers/bobbie-carlton.webp";
import spk_bupendra_chauhan from "@/assets/speakers/bupendra-chauhan.webp";
import spk_chaitra_rao from "@/assets/speakers/chaitra-rao.webp";
import spk_chhavi_garg from "@/assets/speakers/chhavi-garg.webp";
import spk_chinmayi from "@/assets/speakers/chinmayi.webp";
import spk_deeksha_pandey from "@/assets/speakers/deeksha-pandey.webp";
import spk_diana_pham from "@/assets/speakers/diana-pham.webp";
import spk_disha_shrivastava from "@/assets/speakers/disha-shrivastava.webp";
import spk_divina_pooja_john from "@/assets/speakers/divina-pooja-john.webp";
import spk_ernestine_lerisha from "@/assets/speakers/ernestine-lerisha.webp";
import spk_esha_malhotra from "@/assets/speakers/esha-malhotra.webp";
import spk_francesco_ciulla from "@/assets/speakers/francesco-ciulla.webp";
import spk_garima_pahwa from "@/assets/speakers/garima-pahwa.webp";
import spk_gracey_dugar from "@/assets/speakers/gracey-dugar.webp";
import spk_gurtej_singh from "@/assets/speakers/gurtej-singh.webp";
import spk_jacintha_jayachandran from "@/assets/speakers/jacintha-jayachandran.webp";
import spk_jigisha_arora from "@/assets/speakers/jigisha-arora.webp";
import spk_juhie_chandra from "@/assets/speakers/juhie-chandra.webp";
import spk_kanishk_khurana from "@/assets/speakers/kanishk-khurana.webp";
import spk_kaushuka from "@/assets/speakers/kaushuka.webp";
import spk_kavya from "@/assets/speakers/kavya.webp";
import spk_khushi_panwar from "@/assets/speakers/khushi-panwar.webp";
import spk_krishna_aute from "@/assets/speakers/krishna-aute.webp";
import spk_krishna_chaitanya from "@/assets/speakers/krishna-chaitanya.webp";
import spk_kritika_dhima from "@/assets/speakers/kritika-dhima.webp";
import spk_madhu_sathvik from "@/assets/speakers/madhu-sathvik.webp";
import spk_madhura_das from "@/assets/speakers/madhura-das.webp";
import spk_manik from "@/assets/speakers/manik.webp";
import spk_manishka_dubey from "@/assets/speakers/manishka-dubey.webp";
import spk_manna_tyagi from "@/assets/speakers/manna-tyagi.webp";
import spk_matilde_silva from "@/assets/speakers/matilde-silva.webp";
import spk_mehak_garg from "@/assets/speakers/mehak-garg.webp";
import spk_mohit_bhat from "@/assets/speakers/mohit-bhat.webp";
import spk_mohit_sewak from "@/assets/speakers/mohit-sewak.webp";
import spk_muhammad_mudassir from "@/assets/speakers/muhammad-mudassir.webp";
import spk_naga_swathi from "@/assets/speakers/naga-swathi.webp";
import spk_naina_modi from "@/assets/speakers/naina-modi.webp";
import spk_nandini_taneja from "@/assets/speakers/nandini-taneja.webp";
import spk_narayani_gurunathan from "@/assets/speakers/narayani-gurunathan.webp";
import spk_neha_goel from "@/assets/speakers/neha-goel.webp";
import spk_nidhi_banthia_mehta from "@/assets/speakers/nidhi-banthia-mehta.webp";
import spk_nishant_singhal from "@/assets/speakers/nishant-singhal.webp";
import spk_palak_khanna from "@/assets/speakers/palak-khanna.webp";
import spk_pankaj_rai from "@/assets/speakers/pankaj-rai.webp";
import spk_pearl_modi from "@/assets/speakers/pearl-modi.webp";
import spk_pranav_bhat from "@/assets/speakers/pranav-bhat.webp";
import spk_praveen_kumar from "@/assets/speakers/praveen-kumar.webp";
import spk_preetish_kakkar from "@/assets/speakers/preetish-kakkar.webp";
import spk_preksha_mahajan from "@/assets/speakers/preksha-mahajan.webp";
import spk_priyanshi_agarwal from "@/assets/speakers/priyanshi-agarwal.webp";
import spk_radhika_bansal from "@/assets/speakers/radhika-bansal.webp";
import spk_radhika_patwari from "@/assets/speakers/radhika-patwari.webp";
import spk_ramesh_rajini from "@/assets/speakers/ramesh-rajini.webp";
import spk_ramyashree_shetty from "@/assets/speakers/ramyashree-shetty.webp";
import spk_rieselle_saure from "@/assets/speakers/rieselle-saure.webp";
import spk_riya_singhal from "@/assets/speakers/riya-singhal.webp";
import spk_riza_farheen from "@/assets/speakers/riza-farheen.webp";
import spk_rudrakshi from "@/assets/speakers/rudrakshi.webp";
import spk_samridhi_gupta from "@/assets/speakers/samridhi-gupta.webp";
import spk_sanjit_singh from "@/assets/speakers/sanjit-singh.webp";
import spk_sashi_gundala from "@/assets/speakers/sashi-gundala.webp";
import spk_shilpi_mitra from "@/assets/speakers/shilpi-mitra.webp";
import spk_shivam_chhirolya from "@/assets/speakers/shivam-chhirolya.webp";
import spk_shivam_garg from "@/assets/speakers/shivam-garg.webp";
import spk_shreya_mathur from "@/assets/speakers/shreya-mathur.webp";
import spk_shreya_sethi from "@/assets/speakers/shreya-sethi.webp";
import spk_siddhi_agarwal from "@/assets/speakers/siddhi-agarwal.webp";
import spk_siddhi_gupta from "@/assets/speakers/siddhi-gupta.webp";
import spk_smita_bhoine from "@/assets/speakers/smita-bhoine.webp";
import spk_sobhitha_neelanath from "@/assets/speakers/sobhitha-neelanath.webp";
import spk_souradip_pal from "@/assets/speakers/souradip-pal.webp";
import spk_su_jella from "@/assets/speakers/su-jella.webp";
import spk_suhaani_agarwal from "@/assets/speakers/suhaani-agarwal.webp";
import spk_suvendu_mohanty from "@/assets/speakers/suvendu-mohanty.webp";
import spk_svs from "@/assets/speakers/svs.webp";
import spk_swati_sargam from "@/assets/speakers/swati-sargam.webp";
import spk_tanisha_singh from "@/assets/speakers/tanisha-singh.webp";
import spk_unnati_chhabra from "@/assets/speakers/unnati-chhabra.webp";
import spk_urvashi_agarwal from "@/assets/speakers/urvashi-agarwal.webp";
import spk_vasudha_shah from "@/assets/speakers/vasudha-shah.webp";
import spk_vidhushi_agarwal from "@/assets/speakers/vidhushi-agarwal.webp";
import spk_yajur_bajaj from "@/assets/speakers/yajur-bajaj.webp";
import spk_yashaswini_vismaya from "@/assets/speakers/yashaswini-vismaya.webp";
import spk_yashika_kukkar from "@/assets/speakers/yashika-kukkar.webp";
import spk_yog_disha from "@/assets/speakers/yog-disha.webp";
import spk_ridhy from "@/assets/speakers/ridhy-arora.webp";
import spk_sravya from "@/assets/speakers/sravya-uppalapati.webp";
import spk_angel from "@/assets/speakers/angel-sharma.webp";
import spk_anshika from "@/assets/speakers/anshika-agarwal.webp";
import spk_diya from "@/assets/speakers/diya-parelkar.webp";
import spk_garima from "@/assets/speakers/garima-sahu.webp";
import spk_garimajha from "@/assets/speakers/garima-jha.webp";
import spk_danish from "@/assets/speakers/mohammad-danish.webp";
import spk_sweta from "@/assets/speakers/sweta-pandey.webp";

import img_contrib_aakanksha_singh from "@/assets/contributors/aakanksha-singh.jpg";
import img_contrib_aarushi_chottani from "@/assets/contributors/aarushi-chottani.png";
import img_contrib_alina_abreeq from "@/assets/contributors/alina-abreeq.png";
import img_contrib_ankita_kuntal from "@/assets/contributors/ankita-kuntal.jpg";
import img_contrib_archana_gupta from "@/assets/contributors/archana-gupta.jpg";
import img_contrib_avya_giri from "@/assets/contributors/avya-giri.jpg";
import img_contrib_charmi_reddy_p from "@/assets/contributors/charmi-reddy-p.jpg";
import img_contrib_dhairya_kanabar from "@/assets/contributors/dhairya-kanabar.jpeg";
import img_contrib_gungun_goel from "@/assets/contributors/gungun-goel.jpg";
import img_contrib_kashika_gupta from "@/assets/contributors/kashika-gupta.jpg";
import img_contrib_kashish_mahendra_sonawane from "@/assets/contributors/kashish-mahendra-sonawane.jpeg";
import img_contrib_lakshya_s from "@/assets/contributors/lakshya-s.jpg";
import img_contrib_mahak from "@/assets/contributors/mahak.jpg";
import img_contrib_pathan_sama_khan from "@/assets/contributors/pathan-sama-khan.jpg";
import img_contrib_ragini_pandey from "@/assets/contributors/ragini-pandey.jpg";
import img_contrib_simran_parween from "@/assets/contributors/simran-parween.jpg";
import img_contrib_swagita_parida from "@/assets/contributors/swagita-parida.jpg";
import img_contrib_vanshika_chauhan from "@/assets/contributors/vanshika-chauhan.jpg";
import img_mentor_sara_kapoor from "@/assets/contributors/Sara-Kapoor.jpg";
import img_team_aditi_madhukar from "@/assets/team/aditi-madhukar.jpeg";
import img_team_adyasha_das from "@/assets/contributors/adyasha-das.jpg";
import img_team_ananya_agarwal from "@/assets/team/ananya-agarwal.jpg";
import img_team_bagavati_narayanan from "@/assets/team/bagavati-narayanan.jpg";
import img_team_diya_k_bhat from "@/assets/contributors/diya-k-bhat.jpg";
import img_team_ishita_soni from "@/assets/team/ishita-soni.jpg";
import img_team_kavyal_vegad from "@/assets/team/kavyal-vegad.jpg";
import img_team_khushpreet_kaur from "@/assets/team/khushpreet-kaur.jpg";
import img_team_mahi_awasthi from "@/assets/team/mahi-awasthi.png";
import img_team_manik from "@/assets/team/manik.jpg";
import img_team_sanwedana_lokhande from "@/assets/team/sanwedana-lokhande.jpg";
import img_team_sayoni_das from "@/assets/team/sayoni-das.jpg";
import img_team_simran_nagekar from "@/assets/team/simran-nagekar.jpg";
import img_team_vaishnavi_iyer from "@/assets/team/vaishnavi-iyer.jpg";
import img_team_vijay_laxmi from "@/assets/team/vijay-laxmi.jpg";
import img_team_yashika_garg from "@/assets/team/yashika-garg.jpg";

import img_pf_andrew_ng from "@/assets/people/andrew-ng.jpg";
import img_pf_naval_ravikant from "@/assets/people/naval-ravikant.webp";
import img_pf_sam_altman from "@/assets/people/sam-altman.jpg";
import img_pf_reshma_saujani from "@/assets/people/reshma-saujani.jpg";
import img_pf_cassidy_williams from "@/assets/people/cassidy-williams.png";
import img_pf_kelsey_hightower from "@/assets/people/kelsey-hightower.jpg";
import img_pf_lex_fridman from "@/assets/people/lex-fridman.webp";
import img_pf_lenny_rachitsky from "@/assets/people/lenny-rachitsky.webp";
import img_pf_fei_fei_li from "@/assets/people/fei-fei-li.jpg";
import img_pf_tracy_chou from "@/assets/people/tracy-chou.jpg";
import img_pf_sahil_lavingia from "@/assets/people/sahil-lavingia.jpg";
import img_pf_anthony_fu from "@/assets/people/anthony-fu.jpg";

export const speakers: Speaker[] = [
  { id: "s1", name: "Kavya Choudhary", designation: "Scholars'2024", company: "WE by Google TalentSprint", linkedin: "https://www.linkedin.com/in/kavya1610/", image: spk_kavya },
  { id: "s2", name: "Jigisha Arora", designation: "STEP Intern", company: "Google", linkedin: "https://www.linkedin.com/in/jigisha-arora-212ab5256/", image: spk_jigisha_arora },
  { id: "s3", name: "Nishant Singhal", designation: "GSoC'23 Contributor", company: "Google", linkedin: "https://www.linkedin.com/in/nishant-singhal19/", image: spk_nishant_singhal },
  { id: "s4", name: "Divina Pooja John", designation: "Software Engineer", company: "Google", linkedin: "https://www.linkedin.com/in/divina-john/", image: spk_divina_pooja_john },
  { id: "s5", name: "Radhika Bansal", designation: "Software Engineer", company: "Uber", linkedin: "https://www.linkedin.com/in/radhika403/", image: spk_radhika_bansal },
  { id: "s6", name: "Manik", designation: "Founder", company: "Girls Leading Tech", linkedin: "https://www.linkedin.com/in/mrmanik/", image: spk_manik },
  { id: "s7", name: "Swati Sargam", designation: "LinkedIn Coachin'24 Mentee | Intern JPMC", company: "", linkedin: "https://www.linkedin.com/in/swastisargam2002/", image: spk_swati_sargam },
  { id: "s8", name: "Muhammad Mudassir", designation: "Support Engineer", company: "Algorand Foundation", linkedin: "https://www.linkedin.com/in/mohammad-mudassir-b788a41ab/", image: spk_muhammad_mudassir },
  { id: "s9", name: "Siddhi Agarwal", designation: "Mentee 2024 OCaml", company: "Outreachy", linkedin: "https://www.linkedin.com/in/siddhi-agr/", image: spk_siddhi_agarwal },
  { id: "s10", name: "Krishna Aute", designation: "Winner", company: "Google Solution Challenge", linkedin: "https://www.linkedin.com/in/krishna-aute-195b2b135?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", image: spk_krishna_aute },
  { id: "s11", name: "Tanisha Singh", designation: "Winner", company: "Google Girls Hackathon", linkedin: "https://www.linkedin.com/in/the-tanisha-singh/", image: spk_tanisha_singh },
  { id: "s12", name: "Vasudha Shah", designation: "UX Research Lead", company: "Jio", linkedin: "https://www.linkedin.com/in/vasudha-shah-90564a10a/", image: spk_vasudha_shah },
  { id: "s13", name: "Radhika Patwari", designation: "Software Engineer", company: "Uber", linkedin: "https://www.linkedin.com/in/radhika-patwari-334541172/", image: spk_radhika_patwari },
  { id: "s14", name: "Mohit Bhat", designation: "Winner", company: "60x Hackathon", linkedin: "https://www.linkedin.com/in/mbcse/", image: spk_mohit_bhat },
  { id: "s15", name: "Esha Malhotra", designation: "Content Writer", company: "LinkedIn", linkedin: "https://www.linkedin.com/in/malhotraesha/", image: spk_esha_malhotra },
  { id: "s16", name: "Garima Pahwa", designation: "SWE", company: "Becton Dickinson", linkedin: "https://www.linkedin.com/in/garima-pahwa-68416a22a/", image: spk_garima_pahwa },
  { id: "s17", name: "Nidhi Banthia Mehta", designation: "Founder", company: "Self Achievers", linkedin: "https://www.linkedin.com/in/nidhibanthiamehta/", image: spk_nidhi_banthia_mehta },
  { id: "s18", name: "Ramesh Rajini", designation: "Senior Principle Consultant", company: "Infosys", linkedin: "https://www.linkedin.com/in/rameshrajini/", image: spk_ramesh_rajini },
  { id: "s19", name: "Shilpi Mitra", designation: "Principle Software Engineer Manager", company: "Microsoft", linkedin: "https://www.linkedin.com/in/shilpimitra/", image: spk_shilpi_mitra },
  { id: "s20", name: "Dr. Naga Swathi T.j", designation: "Global Senior Director", company: "SAP", linkedin: "https://www.linkedin.com/in/drnagaswathitj/", image: spk_naga_swathi },
  { id: "s21", name: "Madhu Sathvik", designation: "Founder", company: "Satwa Yoga", linkedin: "https://www.facebook.com/madhu.sathvik/", image: spk_madhu_sathvik },
  { id: "s22", name: "Urvashi Agarwal", designation: "Mentee", company: "Codess Cafe", linkedin: "https://www.linkedin.com/in/uraviva/", image: spk_urvashi_agarwal },
  { id: "s23", name: "Deeksha Pandey", designation: "SDE III", company: "Google", linkedin: "https://www.linkedin.com/in/deekshapandey16/", image: spk_deeksha_pandey },
  { id: "s24", name: "Siddhi Gupta", designation: "Scholar", company: "Amazon Future Engineer", linkedin: "https://www.linkedin.com/in/siddhiguptas/", image: spk_siddhi_gupta },
  { id: "s25", name: "Akanksha Buchke", designation: "Intuit", company: "Senior Software Engineer", linkedin: "https://www.linkedin.com/in/akanksha-buchke/", image: spk_akanksha_buchke },
  { id: "s26", name: "Samridhi Gupta", designation: "Scholar", company: "Google WE", linkedin: "https://www.linkedin.com/in/samridhi-gupta08/", image: spk_samridhi_gupta },
  { id: "s27", name: "Naina Modi", designation: "Scholar", company: "Harvard WE Code", linkedin: "https://www.linkedin.com/in/naina-modi-145209322/", image: spk_naina_modi },
  { id: "s28", name: "Chinmayi D.s", designation: "Mentee", company: "Lfx", linkedin: "https://www.linkedin.com/in/chinmayi-d-s-2608b0263/", image: spk_chinmayi },
  { id: "s29", name: "Aarushi Chottani", designation: "Director", company: "Outreach Debate", linkedin: "https://www.linkedin.com/in/aarushi-chottani-80b861322/", image: spk_aarushi_chottani },
  { id: "s30", name: "Pranav Bhat", designation: "Esoc@Skytime Ethindia'24 Winner", company: "", linkedin: "https://www.linkedin.com/in/pranav-bhat-966003195/?lipi=urn%3Ali%3Apage%3Ad_flagship3_people_connections%3B0zFh%2FMa9RsOiFwG3sD4txg%3D%3D", image: spk_pranav_bhat },
  { id: "s31", name: "Preksha Mahajan", designation: "SWE Intern", company: "Nielson", linkedin: "https://www.linkedin.com/in/preksha-mahajan-090359214/", image: spk_preksha_mahajan },
  { id: "s32", name: "Aunshka Srivastava", designation: "SWE Intern", company: "Microsoft", linkedin: "https://www.linkedin.com/in/anushka-srivastava-798540255/?lipi=urn%3Ali%3Apage%3Ad_flagship3_people_connections%3B0zFh%2FMa9RsOiFwG3sD4txg%3D%3D", image: spk_anushka_srivastava },
  { id: "s33", name: "Khushi Panwar", designation: "Ambassador", company: "Women Techmakers", linkedin: "https://www.linkedin.com/in/smilewithkhushi/", image: spk_khushi_panwar },
  { id: "s34", name: "Yog Disha", designation: "Founder", company: "Satva Yoga Centre", linkedin: "https://www.linkedin.com/in/yog-disha-589476118/", image: spk_yog_disha },
  { id: "s35", name: "Priyanshi Agarwal", designation: "SDE", company: "Amazon", linkedin: "https://www.linkedin.com/in/priyanshi-agarwal-4b1713212/", image: spk_priyanshi_agarwal },
  { id: "s36", name: "Riya Singhal", designation: "Software Engineer", company: "Microsoft", linkedin: "https://www.linkedin.com/in/riya-singhal-58a2071a5/", image: spk_riya_singhal },
  { id: "s37", name: "Juhie Chandra", designation: "Software & ML Engineer", company: "Flipkart", linkedin: "https://www.linkedin.com/in/juhiechandra-02/", image: spk_juhie_chandra },
  { id: "s38", name: "Shreya Mathur", designation: "Amss", company: "Amazon", linkedin: "https://www.linkedin.com/in/shreya-mathur-0092b6257/", image: spk_shreya_mathur },
  { id: "s39", name: "Suvendu Mohanty", designation: "Senior ML Engineer", company: "Amazon", linkedin: "https://www.linkedin.com/in/suvenduml/", image: spk_suvendu_mohanty },
  { id: "s40", name: "Akanksha Rani", designation: "Generation Scholar", company: "Google", linkedin: "https://www.linkedin.com/in/akanksha-rani-775355202/", image: spk_akanksha_rani },
  { id: "s41", name: "Yashika Kukkar", designation: "Technology Analyst Intern", company: "Morgan Stanley", linkedin: "https://www.linkedin.com/in/yashika-kukkar-8a1943223/", image: spk_yashika_kukkar },
  { id: "s42", name: "Akshay Gautam", designation: "CTO", company: "Fernbio", linkedin: "https://www.linkedin.com/in/ak-gautam/", image: spk_akshay_gautam },
  { id: "s43", name: "Amandeep Singh", designation: "ML Engineer 3", company: "Paypal", linkedin: "https://www.linkedin.com/in/mundraaman/", image: spk_amandeep_singh },
  { id: "s44", name: "Dr. Mohit Sewak", designation: "Staff Software Engineer", company: "Google", linkedin: "https://www.linkedin.com/in/mohitsewak/", image: spk_mohit_sewak },
  { id: "s45", name: "Disha Shrivastava", designation: "Senior Research Scientist", company: "Google Deepmind", linkedin: "https://www.linkedin.com/in/disha-shrivastava-8398a212/", image: spk_disha_shrivastava },
  { id: "s46", name: "Neha Goel", designation: "Founder", company: "Darzy AI", linkedin: "https://www.linkedin.com/in/nehagoel23/", image: spk_neha_goel },
  { id: "s47", name: "Manna Tyagi", designation: "Winner", company: "Smart India Hackathon", linkedin: "https://www.linkedin.com/in/mannantyagi/", image: spk_manna_tyagi },
  { id: "s48", name: "Nandini Taneja", designation: "SWE", company: "Microsoft", linkedin: "https://www.linkedin.com/in/nandini-taneja4/", image: spk_nandini_taneja },
  { id: "s49", name: "Vidhushi Agarwal", designation: "2024 Winner", company: "Smart India Hackathon", linkedin: "https://www.linkedin.com/in/vidushi-agarwal-8958-developer?utm_source=share_via&utm_content=profile&utm_medium=member_android", image: spk_vidhushi_agarwal },
  { id: "s50", name: "Palak Khanna", designation: "Founder", company: "Break the Ice", linkedin: "https://www.linkedin.com/in/palakh-khanna/", image: spk_palak_khanna },
  { id: "s51", name: "Ayush Kumar Prajapati", designation: "Outreach Partner", company: "Market Mafia", linkedin: "https://www.linkedin.com/in/ayush-kumar-prajapati-82546235a", image: spk_ayush_kumar_prajapati },
  { id: "s52", name: "Chhavi Garg", designation: "Co Founder", company: "Bharat XR & Arexa", linkedin: "https://www.linkedin.com/in/chhavigg/", image: spk_chhavi_garg },
  { id: "s53", name: "Sanjit Singh", designation: "Co Founder", company: "Valkyra Technologies", linkedin: "https://www.linkedin.com/in/sanjit-singh-66374b6a/", image: spk_sanjit_singh },
  { id: "s54", name: "Gurtej Singh", designation: "Senior Manager - Strategy & Growth", company: "Bytexl", linkedin: "https://www.linkedin.com/in/gurtej-singh-cse/", image: spk_gurtej_singh },
  { id: "s55", name: "Sr. Krishna Chaitanya Rao Kathala", designation: "Director", company: "Mtda", linkedin: "https://www.linkedin.com/in/krishnachaitanyarao/", image: spk_krishna_chaitanya },
  { id: "s56", name: "Preetish Kakkar", designation: "Senior Computer Graphics Engineer", company: "Adobe", linkedin: "https://www.linkedin.com/in/preeteesh/", image: spk_preetish_kakkar },
  { id: "s57", name: "Pankaj Rai", designation: "Gde in Android, Firebase & AI", company: "Google", linkedin: "https://www.linkedin.com/in/pankajrai16/", image: spk_pankaj_rai },
  { id: "s58", name: "Praveen Kumar Prurshothaman", designation: "Director of Engineering", company: "Cloudroit", linkedin: "https://www.linkedin.com/in/praveentech/", image: spk_praveen_kumar },
  { id: "s59", name: "Suhaani Agarwal", designation: "Contributor", company: "GSoC", linkedin: "https://www.linkedin.com/in/suhaani-agarwal-010a0a280/", image: spk_suhaani_agarwal },
  { id: "s60", name: "Yajur Bajaj", designation: "AI Product Manager", company: "Dubai Holding", linkedin: "https://www.linkedin.com/in/yajurbajaj/", image: spk_yajur_bajaj },
  { id: "s61", name: "Aarushi Garg", designation: "SDE 1", company: "Adobe", linkedin: "https://www.linkedin.com/in/arushi-garg105/", image: spk_aarushi_garg },
  { id: "s62", name: "Riza Farheen", designation: "Developer Advocate", company: "Orkes", linkedin: "https://www.linkedin.com/in/riza-farheen/", image: spk_riza_farheen },
  { id: "s63", name: "Shivam Chhirolya", designation: "Senior ML Scientist", company: "Prezent AI", linkedin: "https://www.linkedin.com/in/shivam-chhirolya/", image: spk_shivam_chhirolya },
  { id: "s64", name: "Ayush Chugh", designation: "Software Engineer", company: "Avenue Ticket", linkedin: "https://x.com/aayushchugh", image: spk_ayush_chugh },
  { id: "s65", name: "Unnati Chhabra", designation: "Data Scientist", company: "Grid Dynamics", linkedin: "https://x.com/Unnati_twts", image: spk_unnati_chhabra },
  { id: "s66", name: "Rieselle Saure", designation: "Lead Consultane Ambassad", company: "Her Dao", linkedin: "https://x.com/elleseir", image: spk_rieselle_saure },
  { id: "s67", name: "Ankush Dharkar", designation: "Founder & Coach", company: "Real Dev Squad", linkedin: "https://x.com/realankush", image: spk_ankush_dharkar },
  { id: "s68", name: "Kanishk Khurana", designation: "Devrel Engineer", company: "Across Protocol", linkedin: "https://x.com/kanishkkhurana", image: spk_kanishk_khurana },
  { id: "s69", name: "Rudrakshi", designation: "Commuity Manager", company: "Tech Kareer", linkedin: "https://x.com/rudythetechy", image: spk_rudrakshi },
  { id: "s70", name: "Souradip Pal", designation: "Mentee", company: "Lfx Codewavehub", linkedin: "https://www.linkedin.com/in/souradip-pal-codes/", image: spk_souradip_pal },
  { id: "s71", name: "Narayani Gurunathan", designation: "Consultant", company: "Independent", linkedin: "https://x.com/Narayani07", image: spk_narayani_gurunathan },
  { id: "s72", name: "Aditi Tiwari", designation: "Founder", company: "Sia Health", linkedin: "https://x.com/Imaditi007", image: spk_aditi_tiwari },
  { id: "s73", name: "Anubha Pandey", designation: "Data Science Manager", company: "AI Garage Mastercard", linkedin: "https://www.linkedin.com/in/anubha-pandey-294747161/", image: spk_anubha_pandey },
  { id: "s74", name: "Svs", designation: "Tech Recruiter", company: "Independent", linkedin: "https://x.com/_svs_", image: spk_svs },
  { id: "s75", name: "Matilde Silva", designation: "Commuity Strategist Advisor", company: "Her Dao", linkedin: "https://x.com/WHTIFIGO", image: spk_matilde_silva },
  { id: "s76", name: "Francesco Ciulla", designation: "Developer Advocate", company: "Daily.dev", linkedin: "https://x.com/FrancescoCiull4", image: spk_francesco_ciulla },
  { id: "s77", name: "Kaushuka a", designation: "Core SWE Develoer", company: "", image: spk_kaushuka },
  { id: "s78", name: "Diana Pham", designation: "Developer Advocate", company: "Vonage", linkedin: "https://x.com/dianasoyster", image: spk_diana_pham },
  { id: "s79", name: "Bupendra Chauhan", designation: "Developer Advocate", company: "Rise in", linkedin: "https://www.linkedin.com/in/bhupendrachouhan/", image: spk_bupendra_chauhan },
  { id: "s80", name: "Shivam Garg", designation: "Ecosystem Head", company: "Hela Labs", linkedin: "https://www.linkedin.com/in/meshivamgarg/", image: spk_shivam_garg },
  { id: "s81", name: "Sarah", designation: "Engineer", company: "Wolfram", linkedin: "https://www.linkedin.com/in/sarah-park-324407328/" },
  { id: "s82", name: "Pearl Modi", designation: "", company: "", linkedin: "https://www.linkedin.com/in/pearl-mody-0a0289294/", image: spk_pearl_modi },
  { id: "s83", name: "Smita Bhoine", designation: "Mentee", company: "Codess Cafe", linkedin: "https://www.linkedin.com/in/smita-bhoine/", image: spk_smita_bhoine },
  { id: "s84", name: "Mehak Garg", designation: "STEP Intern", company: "Google", linkedin: "https://www.linkedin.com/in/mehakg05/", image: spk_mehak_garg },
  { id: "s85", name: "Ramyashree Shetty", designation: "Data Engineer", company: "Radix", linkedin: "https://www.linkedin.com/in/ramyashree-shetty", image: spk_ramyashree_shetty },
  { id: "s86", name: "Gracey Dugar", designation: "Co Founder", company: "La Gravitea", linkedin: "https://www.linkedin.com/in/gracey-dugar-71b55821b", image: spk_gracey_dugar },
  { id: "s87", name: "Ernestine Lerisha", designation: "AI and Quantum Researcher", company: "Carleton University", linkedin: "https://www.linkedin.com/in/ernestine-lerisha-john-4a863a204/", image: spk_ernestine_lerisha },
  { id: "s88", name: "Manishka Dubey", designation: "Founder", company: "Tinker Techie", linkedin: "https://www.linkedin.com/in/manishka-dubey-871a65202", image: spk_manishka_dubey },
  { id: "s89", name: "Shreya Sethi", designation: "Founder", company: "XR Vision Labs", linkedin: "https://linkedin.com/in/sethishreya", image: spk_shreya_sethi },
  { id: "s90", name: "Aprajita Verma", designation: "Frontend Architect", company: "Mycom", linkedin: "https://www.linkedin.com/in/aprajita-verma-19522814a/", image: spk_aprajita_verma },
  { id: "s91", name: "Ajitha Sindhe", designation: "Program Manager", company: "Code4govtech", linkedin: "https://www.linkedin.com/in/ajitha-sindhe-63623b105/", image: spk_ajitha_sindhe },
  { id: "s92", name: "Anushka Priyadarshi", designation: "Upcoming Intern", company: "Sprinklr", linkedin: "https://www.linkedin.com/in/anushka-priyadarshi/", image: spk_anushka_priyadarshi },
  { id: "s93", name: "Kritika Dhiman", designation: "LinkedIn Coachin Mentee", company: "LinkedIn", linkedin: "https://www.linkedin.com/in/kritika-dhiman-a23104290/", image: spk_kritika_dhima },
  { id: "s94", name: "Bhagyasrie M Masorkar", designation: "Digital Transformatoin Leader", company: "Sify Technologies Ltd", linkedin: "https://www.linkedin.com/in/bhagyashree-masurkar/", image: spk_bhagyasrie_m_masorkar },
  { id: "s95", name: "Su Jella", designation: "Executive Leader", company: "Nano Insights", linkedin: "https://www.linkedin.com/in/sujella/", image: spk_su_jella },
  { id: "s96", name: "Madhura Das", designation: "Founder & CEO", company: "Aspire for Her", linkedin: "https://www.linkedin.com/in/madhura-dasgupta-sinha/", image: spk_madhura_das },
  { id: "s97", name: "Jacintha Jayachandran", designation: "Founder & CEO", company: "Hopework Foundation", linkedin: "https://www.linkedin.com/in/jacintha-jayachandran-empowering1milliongirls/", image: spk_jacintha_jayachandran },
  { id: "s98", name: "Chaitra Rao", designation: "Managing Partner", company: "People Impact", linkedin: "https://www.linkedin.com/in/craopeopleimpact/", image: spk_chaitra_rao },
  { id: "s99", name: "Sobhitha Neelanath", designation: "Senior Manager Software Engineering", company: "Salesforce", linkedin: "https://www.linkedin.com/in/sobhitha-neelanath/", image: spk_sobhitha_neelanath },
  { id: "s100", name: "Bhavana Issar", designation: "Founder & CEO", company: "Caregiver Saathi", linkedin: "https://www.linkedin.com/in/bhavanaissar/", image: spk_bhavana_issar },
  { id: "s101", name: "Yashaswini Vismaya", designation: "Agent AI Engineer", company: "Ltimindtree", linkedin: "https://www.linkedin.com/in/yash-vis/", image: spk_yashaswini_vismaya },
  { id: "s102", name: "Bobbie Carlton", designation: "Founder", company: "Innovation Women", linkedin: "https://www.linkedin.com/in/bobbiecarlton/", image: spk_bobbie_carlton },
  { id: "s103", name: "Sashi Gundala", designation: "Director", company: "Aspire India", linkedin: "https://www.linkedin.com/in/sashigundala/", image: spk_sashi_gundala },
  { id: "s104", name: "Ridhy Arora", designation: "Scholars'2024", company: "WE by Google TalentSprint", linkedin: "https://www.linkedin.com/in/ridhy-arora-097784258/", image: spk_ridhy },
  { id: "s105", name: "Sravya Uppalavapati", designation: "Scholars'2024", company: "WE by Google TalentSprint", linkedin: "https://www.linkedin.com/in/sravyauppalapati16/", image: spk_sravya },
  {id:  "s106", name: "Angel Sharma", designation: "GSOC'24 Mentor", company: "Google", linkedin: "https://www.linkedin.com/in/angel-sharma-2a5240260/", image: spk_angel },
  {id:  "s107", name: "Anshika Aggarwal", designation: "Intern", company: "Salesforce", linkedin: "https://www.linkedin.com/in/anshika-aggarwal-704847249/", image: spk_anshika },
  {id:  "s108", name: "Diya Parelkar", designation: "2024 Winner", company: "Smart India Hackathon", linkedin: " https://www.linkedin.com/in/diya-parelkar?utm_source=share_via&utm_content=profile&utm_medium=member_android", image: spk_diya },
  {id:  "s109", name: "Garima Sahu", designation: "Linkedin CoachIn Mentee", company: "Linkedin", linkedin: "https://www.linkedin.com/in/garima-sahu-84649a322/", image: spk_garima },
  {id:  "s110", name: "Mohammad Danish", designation: "Web3 Enthusiast", company: "", linkedin: "", image: spk_danish },
  {id:  "s111", name: "Garima Jha", designation: "Intern", company: "DRDO", linkedin: "https://www.linkedin.com/in/garimajha25/", image: spk_garimajha },
  {id:  "s112", name: "Sweta Pandey", designation: "Mentee", company: "Codess Cafe", linkedin: "https://www.linkedin.com/in/sweta-pandey-37178a22b/", image: spk_sweta }

];

export const events: Event[] = realEvents.length ? realEvents : [
  {
    id: "evt-001",
    title: "Breaking into Big Tech — Mock Interview Workshop",
    date: "2026-05-18",
    duration: "90 min",
    speakerName: "Aarushi Sharma",
    speakerDesignation: "Senior SDE",
    speakerCompany: "Microsoft",
    summary: "A live workshop walking through behavioural and DSA rounds with real feedback.",
    status: "upcoming",
    registrationLink: "#",
  },
  {
    id: "evt-002",
    title: "From Student to Founder — Building Lumen Labs",
    date: "2026-05-25",
    duration: "60 min",
    speakerName: "Ananya Gupta",
    speakerDesignation: "Founder",
    speakerCompany: "Lumen Labs",
    summary: "An honest conversation about founding journeys, fundraising and building teams.",
    status: "upcoming",
    registrationLink: "#",
  },
  {
    id: "evt-003",
    title: "ML Engineering in Production",
    date: "2026-06-08",
    duration: "75 min",
    speakerName: "Sneha Iyer",
    speakerDesignation: "ML Engineer",
    speakerCompany: "Adobe",
    summary: "Real-world MLOps, model monitoring and the messy parts no tutorial covers.",
    status: "upcoming",
    registrationLink: "#",
  },
  {
    id: "evt-101",
    title: "Designing for Delight — A PM's Playbook",
    date: "2026-03-12",
    duration: "60 min",
    speakerName: "Riya Patel",
    speakerDesignation: "Product Manager",
    speakerCompany: "Google",
    summary: "How to think like a PM and ship products people love.",
    status: "past",
    youtubeLink: "https://youtube.com/@girlsleadingtech",
  },
  {
    id: "evt-102",
    title: "The Engineering Leadership Track",
    date: "2026-02-20",
    duration: "60 min",
    speakerName: "Priya Nair",
    speakerDesignation: "Engineering Lead",
    speakerCompany: "Atlassian",
    summary: "From IC to manager — what changes, what stays the same, and what nobody warns you about.",
    status: "past",
    youtubeLink: "https://youtube.com/@girlsleadingtech",
  },
  {
    id: "evt-103",
    title: "Cloud Security 101",
    date: "2026-01-15",
    duration: "75 min",
    speakerName: "Ishita Roy",
    speakerDesignation: "Security Engineer",
    speakerCompany: "Cloudflare",
    summary: "Threat models, zero trust and how to build security into your daily workflow.",
    status: "past",
    youtubeLink: "https://youtube.com/@girlsleadingtech",
  },
];

export const getEvent = (id: string) => events.find((e) => e.id === id);

export const team: TeamMember[] = [
  { id: "t1", name: "Manik", role: "Partnerships & Sponsorships", city: "Ambala City", state: "Haryana", linkedin: "https://www.linkedin.com/in/mrmanik/", image: img_team_manik },
  { id: "t2", name: "Vaishnavi Iyer", role: "Resource", city: "Bangalore", state: "Karnataka", linkedin: "https://www.linkedin.com/in/vaishnaviiyerms", image: img_team_vaishnavi_iyer },
 {
  id: "t3",
  name: "Vijay Laxmi",
  role: "Speaker Outreaching",
  city: "Delhi",
  linkedin: "https://www.linkedin.com/in/laxmi-vijay/",
  image: img_team_vijay_laxmi,
  description: "The voice behind GLT's incredible speaker lineup — Vijay reaches out, builds relationships, and brings inspiring women in tech to our stage.",
},
  { id: "t4", name: "Ananya Agarwal", role: "Design", city: "Mumbai", state: "Maharashtra", linkedin: "https://www.linkedin.com/in/ananya-agarwal-861317290/", image: img_team_ananya_agarwal },
  { id: "t5", name: "Mahi Awasthi", role: "Content Creation", city: "Derabassi", state: "Punjab", linkedin: "https://www.linkedin.com/in/mahiawasthi/", image: img_team_mahi_awasthi },
  { id: "t6", name: "Yashika garg", role: "Social Media & PR", city: "Abohar", state: "Punjab", linkedin: "https://www.linkedin.com/in/yashika-garg-37baa2290", image: img_team_yashika_garg },
  { id: "t7", name: "Aditi Madhukar", role: "Discord ", city: "New Delhi", linkedin: "https://www.linkedin.com/in/aditimadhukar/", image: img_team_aditi_madhukar },
  { id: "t8", name: "Bagavati Narayanan", role: "Content Writing", city: "Chennai", state: "Tamil Nadu", linkedin: "https://www.linkedin.com/in/bagavati-narayanan-98484b292/", image: img_team_bagavati_narayanan },
  { id: "t9", name: "Kavyal Vegad", role: "Online Events", city: "Mumbai", state: "Maharashtra", linkedin: "https://www.linkedin.com/in/", image: img_team_kavyal_vegad },
  { id: "t10", name: "Simran Nagekar", role: "Discord ", city: "Bangalore", state: "Karnataka", linkedin: "https://www.linkedin.com/in/simransn", image: img_team_simran_nagekar },
  { id: "t11", name: "Ishita Soni", role: "Design", city: "Jaipur", state: "Rajasthan", linkedin: "https://www.linkedin.com/in/ishita-soni-work", image: img_team_ishita_soni },
  { id: "t12", name: "Sayoni Das", role: "Editing", city: "Howrah West Bengal", linkedin: "https://www.linkedin.com/in/sayoni-das-aa3571279", image: img_team_sayoni_das },
  { id: "t13", name: "Khushpreet kaur", role: "Editing", city: "Bathinda punjab", linkedin: "https://www.linkedin.com/in/khushpreet-kaur-123436336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", image: img_team_khushpreet_kaur },
  { id: "t14", name: "Sanwedana Lokhande", role: "Content Writing", city: "Nagpur", state: "maharashtra", linkedin: "https://www.linkedin.com/in/sanwedana-lokhande-35332a33a/", image: img_team_sanwedana_lokhande },
  { id: "t15", name: "Adyasha Das", role: "Tech", city: "Bhubaneswar", state: "Odisha", linkedin: "https://www.linkedin.com/in/adyashadas04/", image: img_team_adyasha_das },
  { id: "t16", name: "Diya K Bhat", role: "Social Media & PR", city: "Bangalore", state: "Karnataka", linkedin: "https://www.linkedin.com/in/diya-k-bhat-75b450257", image: img_team_diya_k_bhat },
];

export const mentors: Mentor[] = [
  { id: "m1", name: "Dr. Kavita Iyer", designation: "Director of Engineering", company: "Salesforce" },
  { id: "m2", name: "Sushmita Rao", designation: "VP Product", company: "Razorpay" },
  { id: "m3", name: "Anjali Mehra", designation: "Principal SDE", company: "Amazon" },
  { id: "m4", name: "Pooja Sinha", designation: "Founder & CEO", company: "BloomTech" },
  { id: "m5", name: "Devika Nair", designation: "Staff ML", company: "Meta" },
  { id: "m6", name: "Sara Kapoor", designation: "Engineering Manager", company: "Shopify", image: img_mentor_sara_kapoor },
];

export const contributors: TeamMember[] = [
  { id: "c1", name: "Naina Reddy", city: "Hyderabad", state: "TS" },
  { id: "c2", name: "Aditi Joshi", city: "Pune", state: "MH" },
  { id: "c3", name: "Simran Kaur", city: "Chandigarh", state: "PB" },
  { id: "c4", name: "Tanvi Shah", city: "Surat", state: "GJ" },
  { id: "c5", name: "Kriti Bansal", city: "Delhi", state: "DL" },
  { id: "c6", name: "Ria Menon", city: "Kochi", state: "KL" },
  { id: "c7", name: "Aakanksha Singh", city: "Navi MUmbai", state: "Maharashtra", linkedin: "https://www.linkedin.com/in/aakanksha-singh1/", image: img_contrib_aakanksha_singh },
  { id: "c8", name: "Kashika Gupta", city: "Indore", state: "Madhya Pradesh", linkedin: "https://www.linkedin.com/in/kashikagupta/", image: img_contrib_kashika_gupta },
];

export const volunteers: TeamMember[] = [
  { id: "v1", name: "Aarushi Chottani", city: "Pune", state: "Maharashtra", linkedin: "https://www.linkedin.com/in/aarushi-chottani-80b861322", image: img_contrib_aarushi_chottani },
  { id: "v2", name: "Alina Abreeq", city: "Hyderabad", state: "Telangana", linkedin: "https://www.linkedin.com/in/alina-abreeq", image: img_contrib_alina_abreeq },
  { id: "v3", name: "Ankita kuntal", city: "Srinagar", linkedin: "https://www.linkedin.com/in/ankita-kuntal?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", image: img_contrib_ankita_kuntal },
  { id: "v4", name: "Archana gupta", city: "New delhi", state: "delhi", linkedin: "https://www.linkedin.com/in/archana-gupta2006", image: img_contrib_archana_gupta },
  { id: "v5", name: "Avya giri", city: "Delhi", linkedin: "https://www.linkedin.com/in/avya-giri-919842320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", image: img_contrib_avya_giri },
  { id: "v6", name: "Charmi Reddy P", city: "Hyderabad", state: "Telangana", linkedin: "https://www.linkedin.com/in/charmi-reddy-p-b2aaa2294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", image: img_contrib_charmi_reddy_p },
  { id: "v7", name: "Dakshata", city: "Delhi" },
  { id: "v8", name: "Dhairya Kanabar", city: "Surendranagar", state: "Gujarat", linkedin: "https://www.linkedin.com/in/dhairya-kanabar-411990294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", image: img_contrib_dhairya_kanabar },
  { id: "v9", name: "Gungun goel", city: "Meerut", state: "Uttar pradesh", linkedin: "https://www.linkedin.com/in/gungun-goyal-05154426a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", image: img_contrib_gungun_goel },
  { id: "v10", name: "Kashish Mahendra Sonawane", city: "Nashik", state: "Maharashtra", linkedin: "https://www.linkedin.com/in/kashish-sonawane-41923a326", image: img_contrib_kashish_mahendra_sonawane },
  { id: "v11", name: "Lakshya S", city: "Chennai", state: "TamilNadu", linkedin: "https://www.linkedin.com/in/lakshya-sasikumar-7bb659342/", image: img_contrib_lakshya_s },
  { id: "v12", name: "Mahak", city: "Delhi", state: "Delhi", linkedin: "https://linktr.ee/document_diaries_with_mahak", image: img_contrib_mahak },
  { id: "v13", name: "Pathan sama khan", city: "Hyderabad", state: "telangana", linkedin: "https://www.linkedin.com/in/sama-khan-628959281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", image: img_contrib_pathan_sama_khan },
  { id: "v14", name: "Ragini Pandey", city: "Ghaziabad", state: "Uttar Pradesh", linkedin: "https://www.linkedin.com/in/ragini-pandey-594564261", image: img_contrib_ragini_pandey },
  { id: "v15", name: "Simran parween", city: "Noida", state: "Uttar Pradesh", linkedin: "https://www.linkedin.com/in/simran-parween-9529b6277?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", image: img_contrib_simran_parween },
  { id: "v16", name: "Swagita Parida", city: "Patiala", state: "Punjab", linkedin: "https://www.linkedin.com/in/swagita-parida-876b54303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", image: img_contrib_swagita_parida },
  { id: "v17", name: "Vanshika Chauhan", city: "Ghaziabad", state: "Uttar Pradesh", linkedin: "https://www.linkedin.com/in/vanshika-chauhan-1ba100279.", image: img_contrib_vanshika_chauhan },
];

export const partners: Partner[] = [
  { id: "p1", name: "Devfolio", type: "community" },
  { id: "p2", name: "Polygon", type: "community" },
  { id: "p3", name: "GitHub Education", type: "community" },
  { id: "p4", name: "Replit", type: "community" },
  { id: "p5", name: "Major League Hacking", type: "community" },
  { id: "p6", name: "Lovable", type: "community" },
  { id: "p7", name: "Postman", type: "community" },
  { id: "p8", name: "Linode", type: "community" },
];

export const testimonials: Testimonial[] = [
  {
    id: "ts1",
    quote: "GLT has had a great impact in my career. All girls herem help each other, wheather it be about internships, jobs or doubts. We have eye opening sessions from zero to pro level. I would definitely recommend this community to everyone, it is an amazing give and take of knowledge.",
    name: "Sweta Sharma",
    role: "Sophomore @BITS-Pilani",
  },
  {
    id: "ts2",
    quote: "The constant support & resources provided, available at any time of the day, are commendable. The mentors are exceptionally supportive, addressing all doubts & offering top-quality resources across both technical and non-technical domains. Their approachable and friendly nature fosters open communication, making it easy for members to seek guidance",
    name: "Khushi Mittal",
    role: "SDE Intern @Amber",
  },
  {
    id: "ts3",
    quote: "What stood out most was how inclusive GLT felt. A rare find, seeing women in STEM finally being represented, and that too in a space led by Manik (yes, a guy leading GLT - poetic irony at its best) felt like a plot twist I didn’t know I needed.t’s only been a short while, but I already feel like I’m part of something bigger, something that actually gets it.",
    name: "Aarushi Chottani",
    role: "Founder & Developer @Autoni",
  },
  {
    id: "ts4",
    quote: "I’ve been a member of this amazing girls in tech community for some time now, and the support and inspiration from other women in tech keeps me motivated to learn and grow. I feel more confident in my skills and can’t wait to learn more and connect with everyone. I would definitely recommend this community to other girls.",
    name: "Aparna A.",
    role: "Web Developer",
  },
  {
    id: "ts5",
    quote: "GLT provides you a platform to interact with other like minded girls, exchange resources & support each other. There's always something for everyone in this community. I highly recommend every girl to join this community — the impact it creates is truly transformative.",
    name: "Bagavati Narayanan",
    role: "Summer Intern @Barclays",
  },
  {
    id: "ts6",
    quote: "Before I joined GLT, I always felt like an imposter even when I was doing my best. Then I found this community and everything shifted. Now when I walk into a tech space I am not second guessing myself, I know I belong here because I have seen so many of us killing it together. You will find your people here and feel so much more confident about where you are headed!",
    name: "Aditi Madhukar",
    role: "Branded Content @Times Internet",
  },
];

export const peopleToFollow: PersonToFollow[] = [
  { id: "pf1", name: "Andrew Ng", domain: "AI / ML", linkedin: "https://www.linkedin.com/in/andrewyng/", summary: "Co-founder of Coursera and DeepLearning.AI. One of the most influential voices in modern AI.", image: img_pf_andrew_ng },
  { id: "pf2", name: "Naval Ravikant", domain: "Finance & Business", twitter: "https://x.com/naval", summary: "AngelList founder. Sharp essays on wealth, leverage and the long game.", image: img_pf_naval_ravikant },
  { id: "pf3", name: "Sam Altman", domain: "AI / Startups", twitter: "https://x.com/sama", summary: "CEO of OpenAI. Pragmatic takes on building startups and the future of AI.", image: img_pf_sam_altman },
  { id: "pf4", name: "Reshma Saujani", domain: "Women in Tech", linkedin: "https://www.linkedin.com/in/reshmasaujani/", summary: "Founder of Girls Who Code. Author and tireless advocate for girls in STEM.", image: img_pf_reshma_saujani },
  { id: "pf5", name: "Cassidy Williams", domain: "Frontend / DevRel", twitter: "https://x.com/cassidoo", summary: "Engineer, educator and one of the warmest voices in frontend.", image: img_pf_cassidy_williams },
  { id: "pf6", name: "Kelsey Hightower", domain: "DevOps / Cloud", twitter: "https://x.com/kelseyhightower", summary: "Kubernetes legend. Generous teacher of distributed systems.", image: img_pf_kelsey_hightower },
  { id: "pf7", name: "Lex Fridman", domain: "AI / Podcasts", twitter: "https://x.com/lexfridman", summary: "MIT researcher and podcaster exploring AI, science and life.", image: img_pf_lex_fridman },
  { id: "pf8", name: "Lenny Rachitsky", domain: "Product", linkedin: "https://www.linkedin.com/in/lennyrachitsky/", summary: "Ex-Airbnb PM running the most-read product newsletter on the internet.", image: img_pf_lenny_rachitsky },
  { id: "pf9", name: "Fei-Fei Li", domain: "AI / ML", linkedin: "https://www.linkedin.com/in/fei-fei-li-4541247/", summary: "Stanford AI lab co-director. Pioneer of computer vision and ImageNet.", image: img_pf_fei_fei_li },
  { id: "pf10", name: "Tracy Chou", domain: "Engineering / Founders", twitter: "https://x.com/triketora", summary: "Founder of Block Party. Vocal advocate for diversity in tech.", image: img_pf_tracy_chou },
  { id: "pf11", name: "Sahil Lavingia", domain: "Indie Founders", twitter: "https://x.com/shl", summary: "Founder of Gumroad. Honest writing on indie founding and creative work.", image: img_pf_sahil_lavingia },
  { id: "pf12", name: "Anthony Fu", domain: "Open Source", twitter: "https://x.com/antfu7", summary: "Vue/Vite/UnoCSS core team. Prolific open-source maintainer.", image: img_pf_anthony_fu },
];

export const placeholderResources: Record<string, Resource[]> = {
  articles: [],
  videos: [],
  courses: [],
  books: [],
  communities: [],
  roadmaps: [],
  "interview-prep": [],
  certifications: [],
};
