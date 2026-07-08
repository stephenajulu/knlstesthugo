import os
import glob
import yaml

def main():
    print("Starting content refactoring to structured markdown...")

    # Define directories
    content_dir = "./content"

    # Define data for pages
    pages_data = {}

    # 1. Who We Are
    pages_data["who-we-are"] = {
        "title": "Who We Are",
        "description": "KNLS institutional profile, legal basis, national library mandate and national documentary heritage role.",
        "body_class": "who-we-are-page",
        "layout": "about",
        "main_class": "who-we-are-page",
        "hero": {
            "kicker": "About Us",
            "title": "Who We Are",
            "subtitle": "Kenya’s national library: preserving knowledge, supporting access and strengthening the library sector."
        },
        "story": {
            "kicker": "Our identity",
            "title": "Serving Kenya as the national custodian of knowledge.",
            "paragraphs": [
                "Kenya National Library Service (KNLS) Board is a statutory body of the Government of Kenya established by an Act of Parliament, Cap 225 of the Laws of Kenya, in April 1965. The State Corporations Act, Cap 446 of the Laws of Kenya, also guides the Board in its operations.",
                "KNLS exists to provide library and information services, promote literacy and safeguard Kenya’s documentary heritage. This foundation reflects our long-standing role as the national library and custodian of the country’s knowledge resources."
            ]
        },
        "context": {
            "kicker": "Our evolving role",
            "title": "National leadership after the devolution of public libraries.",
            "text": "Over the years, KNLS established three national library centres and 61 public libraries in 33 counties. Following the Constitution of Kenya 2010, public-library functions were devolved to County Governments. KNLS now focuses on national policy, standards, preservation, sector support and access to knowledge.",
            "facts": [
                {"value": "1965", "label": "Established by law"},
                {"value": "3", "label": "National library centres"},
                {"value": "33", "label": "Counties historically served"}
            ]
        },
        "functions": {
            "kicker": "What we do",
            "title": "How KNLS protects knowledge and helps people access it.",
            "subtitle": "Our national mandate brings together policy leadership, preservation, research, literacy promotion and practical support for libraries and communities.",
            "items": [
                {"icon": "✦", "title": "National library services", "text": "Set standards, provide guidelines and build library resources across Kenya."},
                {"icon": "✦", "title": "Devolution support", "text": "Support County Governments in running public libraries with training, tools and systems."},
                {"icon": "✦", "title": "Legal deposit", "text": "Collect and catalog all publications printed in Kenya under Cap 225."},
                {"icon": "✦", "title": "Bibliographic standards", "text": "Issue ISBN and ISMN numbers, and publish the Kenya National Bibliography."},
                {"icon": "✦", "title": "Research & guidelines", "text": "Advise the government, conduct research and publish library development standards."},
                {"icon": "✦", "title": "Access to knowledge", "text": "Provide reading spaces, virtual books and mobile libraries for schools and rural communities."}
            ]
        },
        "values": {
            "kicker": "Our principles",
            "title": "What guides our choices and how we serve.",
            "image": "/assets/images/who-we-are/core-values-composite.jpg",
            "image_alt": "KNLS reading activities and community outreach composite",
            "items": [
                {"title": "Transparency", "text": "We operate openly, manage resources responsibly and share information with clarity."},
                {"title": "Inclusivity", "text": "We serve all readers, support accessibility and welcome every community member."},
                {"title": "Innovation", "text": "We embrace digital access, improve Vtabu and update resource management tools."},
                {"title": "Integrity", "text": "We respect bibliographic standards, protect records and uphold public trust."}
            ]
        }
    }

    # 2. Board of Directors
    pages_data["board-of-directors"] = {
        "title": "Board of Directors",
        "description": "KNLS Board members and representatives setting institutional policies and standards.",
        "body_class": "who-we-are-page",
        "layout": "roster",
        "main_class": "roster-main",
        "hero": {
            "kicker": "Governance",
            "title": "Board of Directors",
            "subtitle": "Leading KNLS in policy formulation, standard settings and strategic direction."
        },
        "roster": [
            {
                "name": "Angela Mumo",
                "title": "Chairperson",
                "photo": "/assets/images/angela-mumo.jpg",
                "qualification": "MSc. Information Studies"
            },
            {
                "name": "Joel Kipsang Bett",
                "title": "Director",
                "photo": "/assets/images/joel-kipsang-bett.jpg",
                "qualification": "B.Ed Science"
            },
            {
                "name": "Beatrice Jepkoech Changwony",
                "title": "Director",
                "photo": "/assets/images/beatrice-jepkoech-changwony.png",
                "qualification": "M.Ed Guidance & Counseling"
            },
            {
                "name": "Bishop Robert Theuri Maina",
                "title": "Director",
                "photo": "/assets/images/bishop-robert-theuri-maina.jpg",
                "qualification": "MA Theology"
            },
            {
                "name": "Dorcas A. Obwa",
                "title": "Director",
                "photo": "/assets/images/dorcas-a-obwa.jpg",
                "qualification": "MBA Finance"
            },
            {
                "name": "Dr. Charles Ngui Nziyo",
                "title": "Chief Executive Officer / Board Secretary",
                "photo": "/assets/images/dr-charles-ngui-nziyo.jpg",
                "qualification": "PhD Business Administration"
            },
            {
                "name": "Dr. Silvia K. Vundi",
                "title": "Director",
                "photo": "/assets/images/dr-silvia-k-vundi.jpg",
                "qualification": "PhD Kiswahili",
                "department": "Rep, State Department for Culture"
            },
            {
                "name": "Dr. Naftali Chweya",
                "title": "Director",
                "photo": "/assets/images/dr-naftali-chweya.jpg",
                "qualification": "PhD Chemistry",
                "department": "Rep, National Treasury"
            },
            {
                "name": "Mohammed Abdi Werar",
                "title": "Director",
                "photo": "/assets/images/mohammed-abdi-werar.jpg",
                "qualification": "B.Ed Arts",
                "department": "Rep, State Dept for Basic Education"
            },
            {
                "name": "Ms. Philomena Wairimu Kamau",
                "title": "Director",
                "photo": "/assets/images/ms-philomena-wairimu-kamau.jpg",
                "qualification": "MA Communication"
            }
        ]
    }

    # 3. Management Team
    pages_data["management-team"] = {
        "title": "Management Team",
        "description": "KNLS executive management implementing policy directives and leading department operations.",
        "body_class": "who-we-are-page",
        "layout": "roster",
        "main_class": "roster-main",
        "hero": {
            "kicker": "Leadership",
            "title": "Management Team",
            "subtitle": "Implementing policies, coordinating department functions and guiding public services."
        },
        "roster": [
            {
                "name": "Dr. Charles Ngui Nziyo",
                "title": "Chief Executive Officer",
                "photo": "/assets/images/management-dr-charles-nziyo-management.jpg",
                "qualification": "PhD Business Administration"
            },
            {
                "name": "Albert Nyabuto Nyauntu",
                "title": "Deputy Director",
                "photo": "/assets/images/management-albert-nyabuto-nyauntu.jpg",
                "department": "Technical Services"
            },
            {
                "name": "Janet Rotich",
                "title": "Deputy Director",
                "photo": "/assets/images/management-janet-rotich.jpg",
                "department": "Corporate Services"
            },
            {
                "name": "Alex Ombongi",
                "title": "Head of ICT",
                "photo": "/assets/images/management-alex-ombongi.jpg"
            },
            {
                "name": "Betty Kalugho",
                "title": "Head of Human Resource",
                "photo": "/assets/images/management-betty-kalugho.jpg"
            },
            {
                "name": "Cyrus Ndogo",
                "title": "Head of Procurement",
                "photo": "/assets/images/management-cyrus-ndogo.jpg"
            },
            {
                "name": "Juliana Muchai",
                "title": "Head of Legal Services",
                "photo": "/assets/images/management-juliana-muchai.jpg"
            },
            {
                "name": "Julie Musandu",
                "title": "Head of Public Relations",
                "photo": "/assets/images/management-julie-musandu.jpg"
            },
            {
                "name": "Philomena Mwirigi",
                "title": "Head of Internal Audit",
                "photo": "/assets/images/management-philomena-mwirigi.jpg"
            },
            {
                "name": "Wanjiku Mwangi",
                "title": "Head of Finance & Accounts",
                "photo": "/assets/images/management-wanjiku-mwangi.jpg"
            }
        ]
    }

    # 4. ISBN FAQs
    pages_data["isbn-faqs"] = {
        "title": "ISBN FAQs",
        "description": "Common questions and answers regarding ISBN application, fees, format and eligibility.",
        "body_class": "service-tab-page",
        "layout": "faq",
        "main_class": "isbn-faqs-main",
        "hero": {
            "kicker": "Bibliographic Services",
            "title": "ISBN FAQs",
            "subtitle": "Common questions and answers regarding ISBN and ISMN applications.",
            "parent_title": "Issuance of ISBN",
            "parent_url": "/isbn/"
        },
        "faq": {
            "kicker": "Frequently Asked Questions",
            "title": "ISBN & ISMN FAQ",
            "items": [
                {
                    "question": "What is an ISBN?",
                    "answer": "<p>An ISBN (International Standard Book Number) is a 13-digit unique commercial book identifier number. It is used internationally as a standard method of identifying books.</p>"
                },
                {
                    "question": "Who can apply for an ISBN in Kenya?",
                    "answer": "<p>Any publisher (commercial publishers, self-publishing authors, academic institutions, government departments, NGOs) operating in Kenya can apply for an ISBN.</p>"
                },
                {
                    "question": "What is the cost of an ISBN?",
                    "answer": "<p>Currently, the processing fee is KES 1,000 per ISBN for standard applications. Fees are subject to updates; confirm current rates during online application submission.</p>"
                },
                {
                    "question": "Does an ISBN give copyright protection?",
                    "answer": "<p>No, an ISBN is simply an identification number. It does not provide copyright protection, which is managed separately under Kenya Copyright Board (KECOBO) guidelines.</p>"
                },
                {
                    "question": "How long does it take to get an ISBN?",
                    "answer": "<p>Standard online applications are processed within 2 to 3 business days once the application requirements are met and processing fees are paid.</p>"
                }
            ]
        }
    }

    # 5. ISBN
    pages_data["isbn"] = {
        "title": "Issuance of ISBN",
        "description": "ISBN and ISMN information for Kenyan publishers, authors and music publishers.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main isbn-service-page",
        "hero": {
            "kicker": "Bibliographic Services",
            "title": "Issuance of ISBN",
            "subtitle": "Information for authors and publishers applying for ISBN and ISMN services through KNLS.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "👤",
                "title": "Who can apply?",
                "text": "Kenyan publishers, self-publishing authors, academic institutions, government bodies and corporate organisations."
            },
            {
                "icon": "📋",
                "title": "Requirements",
                "text": "Provide book title, author name, target publication date, format details and publisher contact information."
            },
            {
                "icon": "💳",
                "title": "Charges",
                "text": "Processing fee is KES 1,000 per ISBN. Complete payment securely online through eCitizen."
            },
            {
                "icon": "🚀",
                "title": "How to apply",
                "text": "Log in to the online ISBN portal, fill out publication details, pay processing fees and receive your number."
            }
        ],
        "sidebar": {
            "title": "ISBN Portal",
            "content": "<p>Access online registration, submit book details and track applications.</p><a class='btn btn--orange btn--full' href='https://www.isbn.ac.ke/' rel='noopener' target='_blank'>ISBN Portal</a><br><br><a class='text-link' href='/isbn-faqs/'>Read ISBN FAQs →</a>"
        },
        "content_markdown": "### National Agency for ISBN in Kenya\n\nKNLS is the designated National Agency for the management and issuance of **International Standard Book Numbers (ISBN)** and **International Standard Music Numbers (ISMN)** in Kenya.\n\nAn ISBN is a 13-digit unique international identification number for books and pamphlets. It simplifies book ordering, inventory control, and bibliographic database management globally. An ISMN identifies printed music publications, supporting libraries and music sellers in tracking sheet music and scores.\n\nPublishing standards require a separate ISBN for each distinct format of a publication (e.g. paperback, hardback, PDF, EPUB). Registering your book with an ISBN ensures it is captured in national databases and can be cataloged by libraries and retailers worldwide."
    }

    # 6. Legal Deposit
    pages_data["legal-deposit"] = {
        "title": "Legal Deposit",
        "description": "Preserving Kenya's documentary heritage through mandatory publication submission under Cap 225.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main legal-deposit-page",
        "hero": {
            "kicker": "Bibliographic Services",
            "title": "Legal Deposit",
            "subtitle": "Mandatory publication submission requirements under the Books and Newspapers Act (Cap 111).",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "⚖",
                "title": "Cap 111 Law",
                "text": "Every publisher in Kenya is legally required to deposit copies of their publications with the National Library."
            },
            {
                "icon": "📚",
                "title": "Copies required",
                "text": "Submit 2 copies of books, journals, reports or audio-visual media, and 3 copies of newspapers."
            },
            {
                "icon": "🎯",
                "title": "Purpose",
                "text": "Build the national bibliographic collection, record history and preserve works for future generations."
            },
            {
                "icon": "📍",
                "title": "Drop-off",
                "text": "Submit copies to Maktaba Kuu Building, Upper Hill, or mail them directly to the National Library Agency."
            }
        ],
        "sidebar": {
            "title": "Contact Registry",
            "content": "<p>For legal deposit drop-offs and compliance inquiries:</p><p><strong>National Library Division</strong><br>Maktaba Kuu Building, Upper Hill<br>Nairobi, Kenya</p><a class='text-link' href='/contacts/'>View Branch Map →</a>"
        },
        "content_markdown": "### Preserving the National Footprint\n\nUnder the **Books and Newspapers Act (Cap 111)** of the Laws of Kenya, publishers are legally mandated to submit copies of all works published in the country to the National Library division of KNLS.\n\nLegal deposit ensures that Kenya's intellectual output, literary achievements, and cultural heritage are preserved systematically. Deposited materials are cataloged, conserved, and listed in the **Kenya National Bibliography**, making them discoverable for researchers and academic studies.\n\nWorks subject to legal deposit include books, booklets, pamphlets, newsletters, journals, maps, sheet music, newspapers, and digital formats. Complying with legal deposit protects your intellectual footprint in the official state records."
    }

    # 7. Digitization
    pages_data["digitization"] = {
        "title": "Digitization Services",
        "description": "Preserving historical manuscripts, records and publications through digital imaging and archiving.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main digitization-service-page",
        "hero": {
            "kicker": "Digital Services",
            "title": "Digitization",
            "subtitle": "Preserving, archiving and increasing access to physical records through digital conversion.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "⚡",
                "title": "High-speed scanners",
                "text": "Flatbed, book-edge and large-format scanners designed to handle sensitive historical materials safely."
            },
            {
                "icon": "🔍",
                "title": "OCR searchability",
                "text": "Convert scanned text images into searchable digital documents supporting keywords lookup."
            },
            {
                "icon": "💾",
                "title": "Format export",
                "text": "Export high-resolution files into standard archiving formats like TIFF, PDF/A and EPUB."
            },
            {
                "icon": "🔒",
                "title": "Secure storage",
                "text": "Host digital copies on secure servers inside the KNLS Data Centre for remote retrieval."
            }
        ],
        "sidebar": {
            "title": "Digitization Center",
            "content": "<p>Consult on digital archiving projects, scanning services and metadata cataloging.</p><a class='btn btn--orange btn--full' href='/contacts/'>Contact Digitization Hub</a>"
        },
        "content_markdown": "### Preserving Knowledge Digitally\n\nKNLS **Uhifadhi Centre** provides professional digitization services to preserve historical records, government gazettes, manuscripts, and rare library collections.\n\nThrough scanning and digital conversion, we protect fragile physical items from wear and tear while expanding access for researchers worldwide. Our facilities process books, newspapers, letters, and local community records, applying **Optical Character Recognition (OCR)** to make archives searchable. Digitizing collections ensures that Kenya's documentary heritage remains accessible in the digital era."
    }

    # 8. Data Centre
    pages_data["data-center"] = {
        "title": "Data Centre Services",
        "description": "Secure server hosting, digital storage and network infrastructure managed by KNLS.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main datacentre-page",
        "hero": {
            "kicker": "Digital Services",
            "title": "Data Centre",
            "subtitle": "Providing secure server space, virtual storage and hosting infrastructure for digital services.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "🛡",
                "title": "Secure hosting",
                "text": "Climate-controlled server racks with backup generator power, fire suppression and 24/7 security monitoring."
            },
            {
                "icon": "☁",
                "title": "Cloud storage",
                "text": "Virtual storage solutions supporting local government archives and public library databases."
            },
            {
                "icon": "🔌",
                "title": "Reliable uptime",
                "text": "Redundant internet links and power backups designed to maintain high uptime for digital catalogues."
            },
            {
                "icon": "🛠",
                "title": "Technical support",
                "text": "Support engineers monitoring system health and assisting with database backups and updates."
            }
        ],
        "sidebar": {
            "title": "IT Inquiries",
            "content": "<p>Learn about virtual server packages, secure database hosting and library ICT support.</p><a class='btn btn--orange btn--full' href='/contacts/'>Contact IT Support</a>"
        },
        "content_markdown": "### Modern Digital Infrastructure\n\nThe KNLS **Data Centre** hosts critical library servers, virtual catalogues, e-resources databases, and local archival storage.\n\nWe provide reliable IT infrastructure for public library networks, research databases, and virtual services like **Vtabu**. By hosting resources in a secure, local data environment, we support digital transition across libraries in Kenya, ensuring secure access to digital collections."
    }

    # 9. Braille Library Services
    pages_data["braille-library-services"] = {
        "title": "Braille Library Services",
        "description": "Inclusive reading services, Braille materials and accessible learning equipment at KNLS.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main braille-page",
        "hero": {
            "kicker": "Inclusive Services",
            "title": "Braille Library Services",
            "subtitle": "Accessible reading materials, assistive technologies and dedicated spaces for visually impaired readers.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "⠃",
                "title": "Braille collection",
                "text": "Access books, educational texts and reference publications printed in standard Braille text."
            },
            {
                "icon": "🎧",
                "title": "Audio publications",
                "text": "Browse collections of audio books and read-aloud educational recordings for learning support."
            },
            {
                "icon": "💻",
                "title": "Assistive software",
                "text": "Computers equipped with JAWS screen-readers, text-to-speech tools and digital magnifiers."
            },
            {
                "icon": "👥",
                "title": "Specialist support",
                "text": "Librarians trained in special education and assistive reading systems on-site."
            }
        ],
        "sidebar": {
            "title": "Inclusive Spaces",
            "content": "<p>Dedicated accessibility sections are available at Maktaba Kuu (Upper Hill) and select regional library branches.</p><a class='text-link' href='/who-we-are/'>Our Values →</a>"
        },
        "content_markdown": "### Accessible Knowledge for All\n\nKNLS is committed to inclusive access through dedicated **Braille Library Services** and assistive reading resources.\n\nWe provide books printed in Braille, audio materials, and workstations equipped with screen-reading software like JAWS. Accessible spaces help blind and visually impaired readers study, conduct research, and complete coursework. Our team supports inclusive literacy, assisting students and community members in accessing information."
    }

    # 10. Study and Discussion Rooms
    pages_data["study-and-discussion-rooms"] = {
        "title": "Study and Discussion Rooms",
        "description": "Quiet study desks, group discussions rooms and workspace rentals at KNLS.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main studyrooms-page",
        "hero": {
            "kicker": "Library Spaces",
            "title": "Study & Discussion Rooms",
            "subtitle": "Comfortable reading desks, quiet study blocks and group workspaces for hire.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "📖",
                "title": "Quiet study areas",
                "text": "Spacious reading rooms and individual study booths designed for focused academic work."
            },
            {
                "icon": "🤝",
                "title": "Group discussions",
                "text": "Private conference spaces and meeting rooms available for collaborative project discussions."
            },
            {
                "icon": "📶",
                "title": "Wi-Fi access",
                "text": "High-speed internet connection on-site to support research and digital learning."
            },
            {
                "icon": "🔋",
                "title": "Power sockets",
                "text": "Charging ports at study desks to power laptops, tablets and research devices."
            }
        ],
        "sidebar": {
            "title": "Booking Details",
            "content": "<p>Reserve private discussion rooms or group workspaces at the Maktaba Kuu reception desk.</p><a class='btn btn--orange btn--full' href='/contacts/'>Contact Booking Desk</a>"
        },
        "content_markdown": "### Workspaces Built for Success\n\nKNLS provides quiet **Study and Discussion Rooms** at our Upper Hill headquarters (Maktaba Kuu) and regional branches.\n\nWhether you are studying for examinations, conducting research, or hosting group discussions, our spaces offer a quiet and productive environment. Reading halls, group rooms, high-speed Wi-Fi, and laptop charging ports support students, writers, researchers, and professional study groups."
    }

    # 11. Interlibrary Loans
    pages_data["interlibrary-loans"] = {
        "title": "Interlibrary Loans",
        "description": "Resource sharing, book exchanges and interlibrary lending networks coordinated by KNLS.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main interlibrary-page",
        "hero": {
            "kicker": "Resource Sharing",
            "title": "Interlibrary Loans",
            "subtitle": "Borrow books, academic reports and research materials from partner libraries through KNLS.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "🔄",
                "title": "Network sharing",
                "text": "Access bibliographic items from university libraries, research bodies and government databases."
            },
            {
                "icon": "📦",
                "title": "Logistics support",
                "text": "We handle book transfer, request logistics and safe transit between branches and partner institutions."
            },
            {
                "icon": "📚",
                "title": "Extended catalogue",
                "text": "Find rare publications, reference titles and academic papers not available in local collections."
            },
            {
                "icon": "⏱",
                "title": "Flexible terms",
                "text": "Borrow items under standard interlibrary arrangements with support for renewals."
            }
        ],
        "sidebar": {
            "title": "Loan Requests",
            "content": "<p>Submit title details, author name, and publisher details to the reference librarian to request an interlibrary transfer.</p><a class='btn btn--orange btn--full' href='http://librarycatalog.knls.ac.ke:8011/' rel='noopener' target='_blank'>Search Catalog</a>"
        },
        "content_markdown": "### Expanding Resource Reach\n\nKNLS coordinates **Interlibrary Loans** to help researchers and readers access materials that are not in our immediate collections.\n\nBy partnering with academic libraries, research institutes, and international information networks, we facilitate resource sharing. If you require specific books, archives, or research reports, our team can request transfers from partner institutions, making them available at your nearest KNLS branch."
    }

    # 12. Search Our Collections
    pages_data["search-our-collections"] = {
        "title": "Search Our Collections",
        "description": "Search the KNLS library catalog, OPAC and digital collections databases.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main searchcollections-page",
        "hero": {
            "kicker": "Information Access",
            "title": "Search Our Collections",
            "subtitle": "Search library holdings, OPAC catalog and physical book collections online.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "🔍",
                "title": "Online OPAC",
                "text": "Search physical holdings, book locations, availability status and call numbers online."
            },
            {
                "icon": "🏷",
                "title": "Subject filters",
                "text": "Filter catalog searches by author name, book title, keywords, subject area or publication year."
            },
            {
                "icon": "📱",
                "title": "Account management",
                "text": "Log in to check borrowed titles, track return dates, renew loans and reserve books."
            },
            {
                "icon": "📍",
                "title": "Branch selection",
                "text": "Check holdings across the entire KNLS network, or filter results for your local branch."
            }
        ],
        "sidebar": {
            "title": "OPAC Catalog",
            "content": "<p>Search the online public access catalog (OPAC) to find books and research papers.</p><a class='btn btn--orange btn--full' href='http://librarycatalog.knls.ac.ke:8011/' rel='noopener' target='_blank'>Browse Catalog</a>"
        },
        "content_markdown": "### Find Books Instantly\n\nKNLS provides an **Online Public Access Catalog (OPAC)** allowing readers to search physical holdings across our library network.\n\nThrough the OPAC portal, you can search for books by title, author, or subject area. The system confirms if a book is available on the shelf, displays its shelf number (call number), and lists the branches where it is located. Registered members can also log in to manage accounts, track loans, and renew borrowed items remotely."
    }

    # 13. Reference and Referral Services
    pages_data["reference-and-referral-services"] = {
        "title": "Reference & Referral Services",
        "description": "Research support, information searches and librarian research guidance at KNLS.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main reference-page",
        "hero": {
            "kicker": "Information Access",
            "title": "Reference & Referral Services",
            "subtitle": "Research guidance, reference inquiries and academic information search support.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "💡",
                "title": "Research guidance",
                "text": "Librarians assisting researchers in identifying resources, catalog databases and reference papers."
            },
            {
                "icon": "🗂",
                "title": "Reference resources",
                "text": "Access non-circulating reference collections, rare books, government papers and gazettes on-site."
            },
            {
                "icon": "🔗",
                "title": "Information referral",
                "text": "Referral to external archives, academic networks or specialized research libraries when needed."
            },
            {
                "icon": "📧",
                "title": "Digital inquiries",
                "text": "Submit research questions and query databases remotely through email support."
            }
        ],
        "sidebar": {
            "title": "Ask a Librarian",
            "content": "<p>Submit research inquiries, reference questions, or citation verification requests online.</p><a class='btn btn--orange btn--full' href='mailto:corporatecommunications@knls.ac.ke'>Email Reference Desk</a>"
        },
        "content_markdown": "### Expert Information Support\n\nKNLS **Reference and Referral Services** assist researchers, students, and professionals in finding credible information.\n\nOur reference desks guide users through catalog databases, digital archives, and physical reference collections. For deep academic inquiries, we help verify citations and refer users to external databases or partner research libraries. On-site reference resources include government documents, statistical abstracts, and local history collections."
    }

    # 14. National Reading Day
    pages_data["national-reading-day"] = {
        "title": "National Reading Day",
        "description": "Celebrating National Reading Day, literacy events, school outreach and book reading campaigns in Kenya.",
        "body_class": "national-reading-day-body",
        "layout": "service_detail",
        "main_class": "service-exact-main readingday-page",
        "data_timed_page": "national-reading-day",
        "data_expiry_date": "2026-07-10T23:59:59+03:00",
        "data_expired_redirect": "/events/#events-gallery",
        "hero": {
            "kicker": "National Campaigns",
            "title": "National Reading Day",
            "subtitle": "Celebrating literacy, book reading, writing workshops and school campaigns across Kenya.",
            "parent_title": "Media Center",
            "parent_url": "/media-center/"
        },
        "cards": [
            {
                "icon": "📖",
                "title": "Reading sessions",
                "text": "Public book reading, children storytelling circles and reading circles at library branches."
            },
            {
                "icon": "✍",
                "title": "Creative writing",
                "text": "Creative writing workshops, essay contests and poetry recitals for school children."
            },
            {
                "icon": "🎁",
                "title": "Book donations",
                "text": "Book donation campaigns supporting school libraries in marginalized areas."
            },
            {
                "icon": "🤝",
                "title": "Partnerships",
                "text": "Collaborative literacy drives with schools, publishers, local community groups and sponsors."
            }
        ],
        "sidebar": {
            "title": "Events Calendar",
            "content": "<p>Check the events gallery for highlights, dates, schedules, and list of upcoming branches participating in the campaign.</p><a class='btn btn--orange btn--full' href='/events/'>Events Gallery</a>"
        },
        "content_markdown": "### Building a Nation of Readers\n\n**National Reading Day** is an annual campaign hosted by KNLS to promote a reading culture and highlight literacy across Kenya.\n\nThrough school outreach, book reading circles, writing workshops, and community library campaigns, we encourage children and adults to read. Branches host storytelling circles, author meetups, and book donation drives. This initiative highlights books as tools for personal growth and national empowerment."
    }

    # 15. Go Virtual
    pages_data["go-virtual"] = {
        "title": "Go Virtual",
        "description": "Access the KNLS virtual library, online resources, e-books and e-journals remotely.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-exact-main virtual-page",
        "hero": {
            "kicker": "Digital Services",
            "title": "Go Virtual",
            "subtitle": "Remote access to e-books, research databases, journals and digital resources.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "💻",
                "title": "Virtual library portal",
                "text": "Log in to Vtabu, our digital platform hosting thousands of books, journals and academic papers."
            },
            {
                "icon": "📚",
                "title": "E-resource databases",
                "text": "Access subscribed scientific databases, global e-journals and academic publications."
            },
            {
                "icon": "🏠",
                "title": "Remote access",
                "text": "Read, study, and research from home, school, or office using any internet-connected device."
            },
            {
                "icon": "🏷",
                "title": "Simple registration",
                "text": "Sign up online, select your membership plan, and instantly access digital reading resources."
            }
        ],
        "sidebar": {
            "title": "Vtabu Portal",
            "content": "<p>Access online digital content, e-books, reference papers, and journals on Vtabu.</p><a class='btn btn--orange btn--full' href='https://vtabu.knls.ac.ke/home' rel='noopener' target='_blank'>Visit Vtabu</a>"
        },
        "content_markdown": "### Library Access Anytime, Anywhere\n\nKNLS **Go Virtual** services provide remote access to virtual library resources, digital publications, and scientific research databases.\n\nThrough our **Vtabu** platform, registered members can browse virtual bookshelves, borrow e-books, and read scientific papers online. Vtabu hosts resources for children, secondary students, university researchers, and general readers. Explore virtual learning today."
    }

    # 16. Capacity Building
    pages_data["capacity-building"] = {
        "title": "Capacity Building",
        "description": "Professional training, capacity building programs and advisory services for library personnel.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-detail-main",
        "hero": {
            "kicker": "Technical Support",
            "title": "Capacity Building",
            "subtitle": "Professional training, advisory services and capacity building for libraries in Kenya.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "✦",
                "title": "Technical training",
                "text": "Courses covering cataloging standards, virtual library tools, database operations and digitisation."
            },
            {
                "icon": "✦",
                "title": "Advisory services",
                "text": "Assistive support on library design, layout planning, book selection and systems installation."
            },
            {
                "icon": "✦",
                "title": "Sector guidelines",
                "text": "Setting national standard guidelines, performance metrics and library management procedures."
            },
            {
                "icon": "✦",
                "title": "Institutional support",
                "text": "Teacher support, mobile libraries, reading culture promotion and curriculum-aligned resources."
            }
        ],
        "sidebar": {
            "title": "Training Desk",
            "content": "<p>Consult on training calendars, capacity-building workshops, and system advisory services.</p><a class='btn btn--orange btn--full' href='/contacts/'>Submit Inquiry</a>"
        },
        "gallery": {
            "section_title": "Capacity-building event gallery",
            "kicker": "Training Highlights",
            "subtitle": "Browse selected training and professional-development activities.",
            "items": [
                {
                    "id": "capacity-building-training",
                    "kicker": "Training",
                    "title": "Capacity Building Training",
                    "description": "Professional development and capacity-building training activities.",
                    "images": [
                        "/assets/images/events-photo-gallery/capacity-building-training/capacity-building-training-01.jpg",
                        "/assets/images/events-photo-gallery/capacity-building-training/capacity-building-training-02.jpg",
                        "/assets/images/events-photo-gallery/capacity-building-training/capacity-building-training-03.jpg",
                        "/assets/images/events-photo-gallery/capacity-building-training/capacity-building-training-04.jpg",
                        "/assets/images/events-photo-gallery/capacity-building-training/capacity-building-training-05.jpg"
                    ]
                }
            ]
        },
        "content_markdown": "### Strengthening the Library Sector\n\nKNLS coordinates **Capacity Building** programs to support public library development, standard settings, and systems modernization across Kenya.\n\nFollowing the devolution of public library services, we advise County Governments, install library databases, and run training workshops for librarians. Training modules cover library systems, cataloging metadata, catalog queries, digitization workflows, and visually-impaired support systems."
    }

    # 17. American Corner Programs
    pages_data["american-corner-programs"] = {
        "title": "American Corner Programs",
        "description": "Learning events, speaker panels, and technology workshops hosted at American Corner spaces.",
        "body_class": "service-tab-page",
        "layout": "service_detail",
        "main_class": "service-rich-main",
        "hero": {
            "kicker": "American Spaces",
            "title": "American Corner Programs",
            "subtitle": "Connecting communities through technology, exchange programs and cultural events.",
            "parent_title": "Our Services",
            "parent_url": "/services/"
        },
        "cards": [
            {
                "icon": "🚀",
                "title": "Technology & STEM",
                "text": "Access 3D printers, coding toolkits, virtual reality gear and electronics workshops."
            },
            {
                "icon": "📚",
                "title": "EducationUSA advice",
                "text": "Information resources, reference materials and advisory panels on US university admissions."
            },
            {
                "icon": "👥",
                "title": "Speaker panels",
                "text": "Hosting experts on public health, entrepreneurship, technology, career development and leadership."
            },
            {
                "icon": "🎬",
                "title": "Dialogue and culture",
                "text": "Movie screenings, speaker sessions, career talks and cross-cultural discussions."
            }
        ],
        "sidebar": {
            "title": "Locations",
            "content": "<p>American Spaces are located inside select KNLS libraries including Nairobi (Upper Hill), Nakuru, and Mombasa.</p><a class='text-link' href='/contacts/'>View Locations Map →</a>"
        },
        "gallery": {
            "section_title": "American Corner event highlights",
            "kicker": "American Spaces Events",
            "subtitle": "Browse American Corner and American Spaces activities.",
            "items": [
                {
                    "id": "american-corner",
                    "kicker": "Learning & exchange",
                    "title": "American Corner Programmes",
                    "description": "American Corner learning and cultural exchange activities at KNLS.",
                    "images": [
                        "/assets/images/events-photo-gallery/american-corner/american-corner-01.jpg",
                        "/assets/images/events-photo-gallery/american-corner/american-corner-02.jpg",
                        "/assets/images/events-photo-gallery/american-corner/american-corner-03.jpg",
                        "/assets/images/events-photo-gallery/american-corner/american-corner-04.jpg",
                        "/assets/images/events-photo-gallery/american-corner/american-corner-05.jpg"
                    ]
                },
                {
                    "id": "ai-summit-american-spaces",
                    "kicker": "Digital learning",
                    "title": "AI Summit @ American Spaces",
                    "description": "AI Summit activities hosted through American Spaces.",
                    "images": [
                        "/assets/images/events-photo-gallery/ai-summit-american-spaces/ai-summit-american-spaces-01.jpg",
                        "/assets/images/events-photo-gallery/ai-summit-american-spaces/ai-summit-american-spaces-02.jpg",
                        "/assets/images/events-photo-gallery/ai-summit-american-spaces/ai-summit-american-spaces-03.jpg",
                        "/assets/images/events-photo-gallery/ai-summit-american-spaces/ai-summit-american-spaces-04.jpg",
                        "/assets/images/events-photo-gallery/ai-summit-american-spaces/ai-summit-american-spaces-05.jpg",
                        "/assets/images/events-photo-gallery/ai-summit-american-spaces/ai-summit-american-spaces-06.jpg"
                    ]
                }
            ]
        },
        "content_markdown": "### Community Gateways to Exchange & Innovation\n\n**American Spaces** (American Corners) are collaborative partnerships between the **US Embassy in Kenya** and **KNLS**, providing access to digital learning, STEM tools, and educational opportunities.\n\nLocated inside select KNLS branches, these corners provide free access to computing labs, 3D printing equipment, VR headsets, and EducationUSA advising resources. Weekly activities feature expert panels, coding bootcamps, and career workshops, creating learning environments for youth and professionals."
    }

    # 19. Contacts Page
    pages_data["contacts"] = {
        "title": "Contacts",
        "description": "Contact form, head office details, opening hours and facility information.",
        "layout": "contacts",
        "quick_info": [
            {"icon": "📍", "title": "Headquarters", "text": "Maktaba Kuu Building, Upper Hill, Nairobi"},
            {"icon": "☎", "title": "Telephone", "text": "<a href='tel:+254202739893'>+254 202 739 893</a>"},
            {"icon": "✉", "title": "Email", "text": "<a href='mailto:corporatecommunications@knls.ac.ke'>corporatecommunications@knls.ac.ke</a><br><a href='mailto:complaints@knls.ac.ke'>complaints@knls.ac.ke</a>"},
            {"icon": "⏱", "title": "Opening hours", "text": "Mon–Fri: 8:00AM–6:30PM<br>Sat: 8:30AM–5:00PM"}
        ],
        "locations_section": {
            "kicker": "Visit KNLS",
            "title": "Headquarters and facilities",
            "subtitle": "Use the maps below to locate KNLS headquarters and facilities at a glance."
        },
        "locations": [
            {
                "is_hq": True,
                "image": "/assets/images/contact-locations/hq-maktaba-kuu.jpg",
                "image_alt": "KNLS Headquarters building and library facility",
                "kicker": "Head office",
                "title": "KNLS Headquarters",
                "details": [
                    {"label": "Address", "value": "Maktaba Kuu Building, Upper Hill, Nairobi"},
                    {"label": "Postal", "value": "P.O. Box 30573 – 00100, Nairobi, Kenya"},
                    {"label": "Telephone", "value": "<a href='tel:254202739893'>+254 202 739 893</a>"},
                    {"label": "Email", "value": "<a href='mailto:corporatecommunications@knls.ac.ke'>corporatecommunications@knls.ac.ke</a>"},
                    {"label": "Complaints", "value": "<a href='mailto:complaints@knls.ac.ke'>complaints@knls.ac.ke</a>"}
                ],
                "map_url": "https://www.google.com/maps/search/?api=1&query=Kenya%20National%20Library%20Service%20Maktaba%20Kuu%20Upper%20Hill%20Nairobi",
                "map_embed_url": "https://www.google.com/maps?q=Kenya%20National%20Library%20Service%20Maktaba%20Kuu%20Upper%20Hill%20Nairobi&output=embed",
                "map_title": "Map showing KNLS Headquarters"
            },
            {
                "image": "/assets/images/contact-locations/buruburu-branch.jpg",
                "image_alt": "KNLS Buruburu branch library building",
                "kicker": "Nairobi branch",
                "title": "KNLS Buruburu",
                "details": [
                    {"label": "Address", "value": "Mumias South Road, Buruburu, Nairobi"},
                    {"label": "Telephone", "value": "<a href='tel:254207780709'>+254 207 780 709</a>"},
                    {"label": "Email", "value": "<a href='mailto:buruburulibrary@knls.ac.ke'>buruburulibrary@knls.ac.ke</a>"}
                ],
                "map_url": "https://www.google.com/maps/search/?api=1&query=Kenya%20National%20Library%20Service%20Buruburu%20Mumias%20South%20Road%20Nairobi",
                "map_embed_url": "https://www.google.com/maps?q=Kenya%20National%20Library%20Service%20Buruburu%20Mumias%20South%20Road%20Nairobi&output=embed",
                "map_title": "Map showing KNLS Buruburu Branch"
            }
        ],
        "faqs": [
            {
                "question": "How do I apply for an ISBN?",
                "answer": "Use the official ISBN portal. You can access it through the Apply ISBN buttons on the website."
            },
            {
                "question": "Where is KNLS headquarters?",
                "answer": "KNLS headquarters are at Maktaba Kuu Building, Upper Hill, Nairobi."
            },
            {
                "question": "What are the opening hours?",
                "answer": "Monday to Friday: 8:00AM–6:30PM. Saturday: 8:30AM–5:00PM. KNLS is closed on Sundays and public holidays."
            },
            {
                "question": "What is legal deposit?",
                "answer": "Legal deposit is the submission of copies of eligible publications to preserve Kenya’s national documentary heritage."
            },
            {
                "question": "Does KNLS provide digital resources?",
                "answer": "Yes. The website provides access to e-journals, open e-resources, subscribed e-resources and the virtual library."
            }
        ]
    }

    # 18. Home Page
    pages_data["index"] = {
        "title": "Home",
        "description": "Modern homepage for KNLS services, digital library access, Vtabu, and bibliographic applications.",
        "body_class": "home-page",
        "hero": {
            "panel": {
                "kicker": "Kenya National Library Service",
                "title": "Read. Know. Empower.",
                "subtitle": "Access library services, digital resources, national collections and publishing support through Kenya’s national knowledge gateway.",
                "actions": [
                    {"text": "Explore Featured Services", "url": "#featured-services", "class": "btn--orange"},
                    {"text": "Visit Vtabu", "url": "https://vtabu.knls.ac.ke/home", "class": "btn--light", "external": True},
                    {"text": "Apply ISBN", "url": "https://www.isbn.ac.ke/", "class": "btn--hero-outline", "external": True}
                ]
            },
            "slides": [
                {"image": "/assets/images/homepage-hero/hero-01-knls-direction-banner.jpg", "alt": "KNLS library direction banner and building entrance"},
                {"image": "/assets/images/homepage-hero/hero-02-knls-front-desk.jpg", "alt": "KNLS information desk and public reception area"},
                {"image": "/assets/images/homepage-hero/hero-03-maktabu-roadside-2.jpg", "alt": "Maktaba Kuu exterior view from the roadside"},
                {"image": "/assets/images/homepage-hero/hero-04-maktaba-kuu-building.jpg", "alt": "Maktaba Kuu tower and library building exterior"},
                {"image": "/assets/images/homepage-hero/hero-05-knls-identity-wall.jpg", "alt": "KNLS identity wall with Read Know Empower message"},
                {"image": "/assets/images/homepage-hero/hero-06-maktaba-kuu-roadside.jpg", "alt": "Maktaba Kuu roadside exterior and library building"},
                {"image": "/assets/images/homepage-hero/hero-07-interior-atrium-reading.JPG", "alt": "Interior atrium reading spaces at Maktaba Kuu library"},
                {"image": "/assets/images/homepage-hero/hero-08-interior-reading-level.JPG", "alt": "Upper reading level and reference spaces inside Maktaba Kuu"},
                {"image": "/assets/images/homepage-hero/hero-09-interior-staircase-view.JPG", "alt": "Open staircase and study spaces inside Maktaba Kuu library"},
                {"image": "/assets/images/mobile-library-bus/mobile-library-bus-01.jpg", "alt": "KNLS mobile library bus supporting community outreach"},
                {"image": "/assets/images/mobile-library-bus/mobile-library-bus-02.jpg", "alt": "KNLS mobile library bus supporting community outreach"},
                {"image": "/assets/images/mobile-library-bus/mobile-library-bus-03.jpg", "alt": "KNLS mobile library bus supporting community outreach"},
                {"image": "/assets/images/mobile-library-bus/mobile-library-bus-04.jpg", "alt": "KNLS mobile library bus supporting community outreach"},
                {"image": "/assets/images/mobile-library-bus/mobile-library-bus-05.jpg", "alt": "KNLS mobile library bus supporting community outreach"}
            ]
        },
        "intro": {
            "kicker": "About KNLS",
            "title": "Kenya National Library Service",
            "text": "KNLS is a Government State Corporation established under Cap 225 of the Laws of Kenya in 1965 and revised under Act No. 12 of 1984. Headquartered at Maktaba Kuu in Upper Hill, Nairobi, KNLS provides national library services, digital access and public information resources.",
            "link_text": "Learn more about KNLS",
            "link_url": "/who-we-are/"
        },
        "featured_services": {
            "kicker": "Featured services",
            "title": "Find what you need faster",
            "subtitle": "Quick access to core KNLS services.",
            "services": [
                {
                    "class": "homepage-service-card--digitization",
                    "image": "/assets/images/homepage-final/digitization-featured-service-updated.jpg",
                    "alt": "Digitization scanner preserving a book for digital archiving",
                    "kicker": "Uhifadhi Centre",
                    "title": "Digitization",
                    "text": "Convert physical materials into digital formats for preservation, access and sharing.",
                    "link": "/digitization/",
                    "link_text": "Read more"
                },
                {
                    "image": "/assets/images/homepage-final/data-centre-server-room.jpg",
                    "alt": "Data centre server room infrastructure",
                    "kicker": "Digital infrastructure",
                    "title": "Data Centre",
                    "text": "Access secure storage, server support and information management infrastructure.",
                    "link": "/data-center/",
                    "link_text": "Read more"
                },
                {
                    "image": "/assets/images/homepage-final/vtabu-brochure-updated.jpg",
                    "alt": "Vtabu virtual library brochure",
                    "kicker": "Virtual access",
                    "title": "Vtabu",
                    "text": "Use the virtual library to access digital books, journals and online resources.",
                    "link": "/go-virtual/",
                    "link_text": "Visit Vtabu"
                },
                {
                    "image": "/assets/images/homepage-final/isbn-bar-code.jpg",
                    "alt": "ISBN barcode illustration",
                    "kicker": "Authors & publishers",
                    "title": "ISBN",
                    "text": "Apply for ISBN services and support proper identification of Kenyan publications.",
                    "link": "/isbn/",
                    "link_text": "Apply for ISBN"
                }
            ]
        },
        "author_journey": {
            "kicker": "Authors and publishers",
            "title": "Make your publication part of Kenya’s documentary heritage.",
            "subtitle": "Complete the core publishing steps through KNLS: legal deposit, Kenya National Bibliography and ISBN support.",
            "steps": [
                {"number": "01", "title": "Drop legal deposit copies", "subtitle": "Support preservation of Kenya’s national documentary heritage.", "link": "/legal-deposit/"},
                {"number": "02", "title": "Enter publication details", "subtitle": "Be captured in the Kenya National Bibliography.", "link": "/kenya-national-bibliography/"},
                {"number": "03", "title": "Apply for ISBN", "subtitle": "Confirm whether your book has an International Standard Book Number.", "link": "https://www.isbn.ac.ke/", "external": True}
            ]
        },
        "facilities": {
            "kicker": "Our spaces",
            "title": "Explore KNLS facilities",
            "subtitle": "Browse KNLS interiors, service areas and public reading spaces.",
            "slides": [
                {"image": "/assets/images/facilities-slideshow/facility-01-reading-floor-png.jpg", "alt": "Reading and reference floor at KNLS"},
                {"image": "/assets/images/facilities-slideshow/facility-04-upper-reading-area.jpg", "alt": "Children reading in a KNLS library space"},
                {"image": "/assets/images/facilities-slideshow/facility-03-open-atrium.jpg", "alt": "Open atrium and study spaces at KNLS"},
                {"image": "/assets/images/facilities-slideshow/facility-01-reading-floor.jpg", "alt": "Children selecting books at a KNLS reading activity"},
                {"image": "/assets/images/facilities-slideshow/facility-05-direction-banner.jpg", "alt": "KNLS direction banner and service signage"},
                {"image": "/assets/images/facilities-slideshow/facility-06-exterior-library.jpg", "alt": "Maktaba Kuu exterior view"}
            ]
        },
        "accessibility_highlight": {
            "kicker": "Accessibility highlight",
            "title": "Section for the Visually Impaired",
            "text": "KNLS supports inclusive access to knowledge through dedicated service areas designed to improve access for readers with visual impairments.",
            "link": "/services/",
            "link_text": "Explore KNLS services",
            "slides": [
                {"image": "/assets/images/facilities-slideshow/braille-slide-01.jpg", "alt": "Person reading Braille material"},
                {"image": "/assets/images/facilities-slideshow/braille-slide-02.jpg", "alt": "Braille reading support material"},
                {"image": "/assets/images/facilities-slideshow/braille-slide-03.jpg", "alt": "Hands reading Braille text"},
                {"image": "/assets/images/facilities-slideshow/braille-slide-04-visually-impaired-section.jpg", "alt": "KNLS section for the visually impaired"}
            ]
        }
    }

    # Write each page as markdown and delete the old HTML counterpart
    for name, data in pages_data.items():
        if name == "index":
            html_path = os.path.join(content_dir, "_index.html")
            md_path = os.path.join(content_dir, "_index.md")
        else:
            html_path = os.path.join(content_dir, f"{name}.html")
            md_path = os.path.join(content_dir, f"{name}.md")

        print(f"Refactoring {name} -> {md_path}...")
        
        # Prepare front matter parameters
        front_matter = {}
        for key in ["title", "description", "body_class", "layout", "main_class", "data_timed_page", "data_expiry_date", "data_expired_redirect"]:
            if key in data:
                front_matter[key] = data[key]
                
        for key in ["hero", "story", "context", "functions", "values", "roster", "faq", "cards", "sidebar", "gallery", "intro", "featured_services", "author_journey", "facilities", "accessibility_highlight"]:
            if key in data:
                front_matter[key] = data[key]

        # Convert front matter dict to YAML string
        yaml_str = yaml.dump(front_matter, sort_keys=False, default_flow_style=False, allow_unicode=True)

        # Content body
        content_body = data.get("content_markdown", "")

        # Write MD file
        with open(md_path, "w", encoding="utf-8") as f:
            f.write("---\n" + yaml_str + "---\n\n" + content_body + "\n")

        # Remove old HTML file
        if os.path.exists(html_path):
            os.remove(html_path)
            print(f"Removed deprecated HTML content file: {html_path}")


    print("\nContent refactoring to structured Markdown finished successfully!")

if __name__ == "__main__":
    main()
