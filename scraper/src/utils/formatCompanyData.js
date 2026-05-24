const companies = [
    {
        "name": "TechGropse Pvt. Ltd.",
        "slug": "techgropse",
        "website": "https://www.techgropse.com/",
        "description": "Techgropse is a leading Mobile App and Web Development Company, dedicated to turning innovative ideas into remarkable digital solutions. 500+ Clients",
        "industry": "Mobile App Development",
        "employee_count": 250,
        "founded_year": "2015",
        "offices": [
            {
                "city": "Deira",
                "state": "United Arab Emirates",
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "Vinsys IT Corporate Training Company in India",
        "slug": "vinsys-it-corporate-training-company-in-india",
        "website": "https://www.vinsys.com/training/in/corporate-training",
        "description": "Vinsys ISO certified globally acclaimed individual and corporate training provider legacy of empowering professionals. Award Wining Trainers .",
        "industry": "Corporate Training",
        "employee_count": 250,
        "founded_year": "1999",
        "offices": [
            {
                "city": "Pune",
                "state": "Maharashtra",
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "Carmatec Inc - Mobile App Development Company",
        "slug": "carmatec-inc",
        "website": "https://www.carmatec.com/",
        "description": "Enterprise Web & Mobile App Development Company in Bangalore",
        "industry": "Mobile App Development",
        "employee_count": 50,
        "founded_year": "2004",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "Digitly",
        "slug": "digitly-in",
        "website": "https://digitly.in/?utm_source=techbehemoths",
        "description": "Your trusted partner in digital marketing. With a strong global presence, we have successfully collaborated with clients across globe.",
        "industry": "SEO",
        "employee_count": 10,
        "founded_year": "2021",
        "offices": [
            {
                "city": "Navi Mumbai",
                "state": null,
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "Rishabh Software Pvt. Ltd",
        "slug": "rishabh-software",
        "website": "http://www.rishabhsoft.com",
        "description": "We Are The Technology Experts Who Care",
        "industry": "Web Development",
        "employee_count": 250,
        "founded_year": "1999",
        "offices": [
            {
                "city": "Vadodara",
                "state": null,
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "Creuto",
        "slug": "creuto",
        "website": "https://creuto.com/",
        "description": "Creuto builds AI products, custom software, and mobile & web apps that help startups and enterprises turn ideas into scalable digital solutions.",
        "industry": "Custom Software Development",
        "employee_count": 10,
        "founded_year": "2023",
        "offices": [
            {
                "city": "Bhubaneswar",
                "state": null,
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "Touchstone Infotech",
        "slug": "touchstone-infotech",
        "website": "https://www.touchstoneinfotech.com/",
        "description": "Touchstone Infotech is a full-service digital marketing agency. We have a team of professionals who work client trust and ensure their satisfaction.",
        "industry": "Pay Per Click",
        "employee_count": 10,
        "founded_year": "2013",
        "offices": [
            {
                "city": "New Delhi",
                "state": null,
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "Codilar Technologies",
        "slug": "codilar-technologies",
        "website": "http://www.codilar.com/",
        "description": "Built eCommerce site that makes $10+ million a year",
        "industry": "E-Commerce Development",
        "employee_count": 50,
        "founded_year": "2015",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "DTC Infotech Pvt Ltd",
        "slug": "dtc-infotech-pvt-ltd",
        "website": "https://www.dtcinfotech.com",
        "description": "DTC is a DeepTech company specialised in offering digital solutions for Enterprises with AI powered Applications, Data Engineering and Managed service",
        "industry": "Artificial Intelligence",
        "employee_count": 50,
        "founded_year": "2021",
        "offices": [
            {
                "city": "Dallas",
                "state": "United States",
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "AI-native engineering partner",
        "slug": "ailoitte-technologies-pvt-ltd",
        "website": "https://www.ailoitte.com/",
        "description": "Ailoitte is an AI-native engineering partner delivering apps, enterprise software, and AI products through fixed-price, outcome-based Velocity Pods.",
        "industry": "Mobile App Development",
        "employee_count": 50,
        "founded_year": "2017",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "Sulonya Technologies Private Limited",
        "slug": "sulonya-technologies-private-limited",
        "website": "https://sulonya.com",
        "description": "Sulonya Technologies builds scalable SaaS and full-stack solutions, helping startups and enterprises launch faster.",
        "industry": "Web Development",
        "employee_count": 50,
        "founded_year": "2020",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "Codewave Global",
        "slug": "codewave-technologies",
        "website": "https://www.codewave.com/",
        "description": "Unlock Rapid Innovation in Design &amp; Tech: AI-Powered Efficiency (2x), Transparent Costs, Limitless Customization!",
        "industry": "Web Development",
        "employee_count": 50,
        "founded_year": "2013",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "OPM Corporation",
        "slug": "opm-corporation-private-limited",
        "website": "https://www.opmcorporation.com",
        "description": "OPM Corporation is a leading business consulting and IT services firm delivering innovative, scalable solutions across multiple industries.",
        "industry": "Business Consulting",
        "employee_count": 50,
        "founded_year": "2020",
        "offices": [
            {
                "city": "Mumbai",
                "state": "Maharashtra",
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "The Media Ant",
        "slug": "the-media-ant",
        "website": "http://www.themediaant.com/",
        "description": "The Media Ant is India’s leading ad platform for media discovery, planning, buying, and execution across digital, print, TV, radio, and more.",
        "industry": "Advertising",
        "employee_count": 50,
        "founded_year": "2012",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "Ozrit",
        "slug": "ozrit",
        "website": "https://ozrit.com/",
        "description": "We Develop Applications that Drive Success with Precision",
        "industry": "Web Development",
        "employee_count": 250,
        "founded_year": "2009",
        "offices": [
            {
                "city": "Hyderabad",
                "state": "Telangana",
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "Flashyminds",
        "slug": "flashyminds",
        "website": "https://flashyminds.com/",
        "description": "Flashyminds is a full-service digital agency delivering innovative marketing, AI automation and development for growth-focused brands worldwide.",
        "industry": "Digital Marketing",
        "employee_count": 10,
        "founded_year": "2022",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "scaleroot technologies",
        "slug": "scaleroot-technologies",
        "website": "https://www.scaleroot.io/",
        "description": "Healthcare AI & DevSecOps | Cloud-Native Platforms for Clinical Trials, Pharma & Regulated Industries",
        "industry": "Artificial Intelligence",
        "employee_count": 10,
        "founded_year": "2020",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "Verveo",
        "slug": "verveo",
        "website": "https://verveo.com/",
        "description": "Verveo | Digital Engineering, AI & Software Development Company",
        "industry": "Web Development",
        "employee_count": 50,
        "founded_year": "2024",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "Amazecodes Solutions Pvt Ltd",
        "slug": "amazecodes-solutions-pvt-ltd",
        "website": "https://amazecodes.com/",
        "description": "Aspire to Amaze",
        "industry": "Custom Software Development",
        "employee_count": 10,
        "founded_year": "2013",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "Webyansh",
        "slug": "webyansh",
        "website": "https://webyansh.com/",
        "description": "Webyansh is a premium UX design and Webflow agency in India. Expert UX/UI design, web development, and SEO / AEO for startups and enterprises.",
        "industry": "SEO",
        "employee_count": 2,
        "founded_year": "2024",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "ANSI",
        "slug": "ansi",
        "website": "https://ansiconsult.com",
        "description": "Salesforce Partner delivering CRM, SAP Support, Web Development, Cyber Security, IT Infrastructure, Zoho Solutions, and digital transformation.",
        "industry": "CRM Consulting",
        "employee_count": 10,
        "founded_year": "2024",
        "offices": [
            {
                "city": "Dubai",
                "state": "United Arab Emirates",
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "RepIndia",
        "slug": "repindia",
        "website": "https://www.repindia.com",
        "description": "Repindia is an award-winning digital marketing company in India that offers unique & updated solutions in SEO, Social Media, ORM, & Web Development",
        "industry": "SEO",
        "employee_count": 50,
        "founded_year": "2013",
        "offices": [
            {
                "city": "New Delhi",
                "state": null,
                "is_hq": true
            },
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": false
            }
        ]
    },
    {
        "name": "Enaviya Information Technologies Pvt Ltd",
        "slug": "enaviya-information-technologies-pvt-ltd",
        "website": "https://www.enaviya.com/",
        "description": "We develop custom solutions and provide quality resources on Per Hour $ rate. We have wide experience in .NET, Angular, React js, Sharepoint.",
        "industry": "Custom Software Development",
        "employee_count": 50,
        "founded_year": "2006",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    },
    {
        "name": "Navaris Digital Pvt Ltd",
        "slug": "navaris-digital-pvt-ltd",
        "website": "https://navarisdigital.com/",
        "description": "A passionate team of innovators dedicated to transforming your digital vision into reality.",
        "industry": "Web Design",
        "employee_count": 10,
        "founded_year": "2016",
        "offices": [
            {
                "city": "Bangalore",
                "state": "Karnataka",
                "is_hq": true
            }
        ]
    }
];

// Country → state mapping for known cities (extend as needed)
const cityToState = {
    "deira": "Dubai",
    "dubai": "Dubai",
    "pune": "Maharashtra",
    "bangalore": "Karnataka",
    "mumbai": "Maharashtra",
    "delhi": "Delhi",
    "hyderabad": "Telangana",
    "chennai": "Tamil Nadu",
    "surat": "Gujarat",
    "ahmedabad": "Gujarat",
    "kolkata": "West Bengal",
    "jaipur": "Rajasthan",
};

function getState(citySlug, countryName) {
    if (countryName !== "India") return countryName; // For non-India, use country as state
    return cityToState[citySlug?.toLowerCase()] || null;
}

function getPrimaryIndustry(services) {
    if (!services || services.length === 0) return null;
    // Pick the service with the highest percentage
    return services.reduce((top, s) =>
        parseInt(s.percentage) > parseInt(top.percentage) ? s : top
    ).name;
}

function transform(companies) {
    return companies.map(c => {
        const offices = [];

        // Headquarter office
        if (c.headquarter?.city) {
            const hqCity = c.headquarter.city.name;
            const hqCitySlug = c.headquarter.city.slug;
            const hqCountry = c.headquarter.country?.name;
            offices.push({
                city: hqCity,
                state: getState(hqCitySlug, hqCountry),
                is_hq: true,
            });
        }

        // Other locations
        if (c.other_location?.city) {
            const otherCity = c.other_location.city.name;
            const otherCitySlug = c.other_location.city.slug;
            const otherCountry = c.other_location.country?.name;
            // Avoid duplicate if same city as HQ
            const isDuplicate = offices.some(o => o.city === otherCity);
            if (!isDuplicate) {
                offices.push({
                    city: otherCity,
                    state: getState(otherCitySlug, otherCountry),
                    is_hq: false,
                });
            }
        }

        return {
            name: c.name,
            slug: c.slug,
            website: c.website || null,
            description: c.description || null,
            industry: getPrimaryIndustry(c.services),
            employee_count: c.company_size || null,
            founded_year: c.founded_year ? String(c.founded_year) : null,
            offices,
        };
    });
}

const transformed = transform(companies);
console.log(JSON.stringify(transformed, null, 2));

// Also print as JS object literal (matching your target format)
console.log("\n\n// --- JS Object Literal Format ---\n");
transformed.forEach(c => {
    console.log(`  {`);
    console.log(`    name: '${c.name}',`);
    console.log(`    slug: '${c.slug}',`);
    console.log(`    website: '${c.website}',`);
    console.log(`    description: '${c.description}',`);
    console.log(`    industry: '${c.industry}',`);
    console.log(`    employee_count: ${c.employee_count},`);
    console.log(`    founded_year: '${c.founded_year}',`);
    console.log(`    offices: [`);
    c.offices.forEach(o => {
        console.log(`      { city: '${o.city}', state: '${o.state}', is_hq: ${o.is_hq} },`);
    });
    console.log(`    ],`);
    console.log(`  },`);
});


module.exports = { transform }