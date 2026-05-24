const { chromium } = require('playwright');
const fs = require('fs');
const { transform } = require('../utils/formatCompanyData.js');

let companies = [
  {
    "id": 89428,
    "name": "Navaris Digital Pvt Ltd",
    "slug": "navaris-digital-pvt-ltd",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-698c9238233aa-x2.png",
    "description": "A passionate team of innovators dedicated to transforming your digital vision into reality.",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://navarisdigital.com/",
    "claimed": true,
    "founded_year": 2016,
    "updated_at": "2026-02-12T06:02:43.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 101,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 49550,
    "name": "Identixweb Limited",
    "slug": "identixweb-limited",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68e8912ae898f-x2.png",
    "description": "We are Shopify experts helping over 12,000 merchants sell more and grow stronger with our apps & services since 2017.",
    "company_size": 50,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.identixweb.com/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2026-05-10T09:37:10.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Surat",
        "slug": "surat"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 100,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 3
    },
    "services": [
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "35"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 13
    }
  },
  {
    "id": 51266,
    "name": "Fortunesoft IT Innovations",
    "slug": "fortunesoft-it-innovations",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/51266/fortunesoft_logo_0.png",
    "description": "Industry-Specific, Ready To Deploy Software Solutions That Drive Results",
    "company_size": 50,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.fortunesoftit.com",
    "claimed": true,
    "founded_year": 2009,
    "updated_at": "2025-12-08T06:12:57.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "Nashville",
        "slug": "nashville"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 100,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 62,
        "name": "Blockchain",
        "long_name": null,
        "slug": "blockchain",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 91364,
    "name": "GeoPITS Global Pvt Ltd",
    "slug": "geopits-global-pvt-ltd",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6a0182f099ab2-x2.png",
    "description": "Remote DBA and database solutions provider specialized in performance optimization and cloud database management across RDS, PostgreSQL, MySQL, MSSQL.",
    "company_size": 50,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.geopits.com/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2026-05-11T07:19:36.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 99,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "18"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "17"
      },
      {
        "id": 118,
        "name": "Oracle Consultancy",
        "long_name": "<span>Oracle</span> Consultancy",
        "slug": "oracle",
        "heading": null,
        "parent_id": 99,
        "is_new": true,
        "percentage": "17"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "16"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "16"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "16"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 45765,
    "name": "KODA Integrated Marketing Services",
    "slug": "koda-integrated-marketing-services",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-693ab6eccaec6-x2.png",
    "description": "Elevate Your Digital Presence with Koda a End to End Digital Marketing Agency",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://koda.co.in/",
    "claimed": true,
    "founded_year": 2019,
    "updated_at": "2025-12-16T08:49:58.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 99,
    "awards_count": {
      "year_2023": 3,
      "year_2024": 3,
      "year_2025": 0
    },
    "services": [
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "13"
      },
      {
        "id": 35,
        "name": "Video Production",
        "long_name": null,
        "slug": "video-production",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 8,
        "name": "PR",
        "long_name": null,
        "slug": "pr",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 4
    }
  },
  {
    "id": 81612,
    "name": "Conchakra Technologies Pvt Ltd",
    "slug": "conchakra-technologies-pvt-ltd",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-682e1989f1834-x2.png",
    "description": "AI-powered software solutions for every industry",
    "company_size": 2,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.conchakra.com",
    "claimed": true,
    "founded_year": 2025,
    "updated_at": "2026-01-09T19:37:13.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 98,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 102,
        "name": "Desktop App Development",
        "long_name": null,
        "slug": "desktop-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 105,
        "name": "Accelerated Mobile Pages",
        "long_name": null,
        "slug": "accelerated-mobile-pages",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 28,
        "name": "Architectural Design",
        "long_name": null,
        "slug": "architectural-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 43,
        "name": "BI & Big Data Consulting",
        "long_name": null,
        "slug": "bi-big-data-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 92444,
    "name": "WebDigiSoft",
    "slug": "webddigisoft",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6a060e9d579b9-x2.png",
    "description": "WebDigiSoft is a web design and digital marketing agency offering SEO, WordPress, eCommerce, and custom website solutions.",
    "company_size": 2,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.webdigisoft.com",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2026-05-15T06:46:03.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 98,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "30"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "10"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 45116,
    "name": "Dream Websters Infotech Private Limited",
    "slug": "dream-websters-infotech-private-limited",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/45116/250x250_dw22_fil_finale_creat_outlines_-_copy_1.png",
    "description": "Your Dreams, Our Priority",
    "company_size": 2,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.dreamwebsters.com",
    "claimed": true,
    "founded_year": 2016,
    "updated_at": "2025-07-18T14:55:10.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 98,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "4.8",
      "total": 5
    }
  },
  {
    "id": 59083,
    "name": "Monaqo",
    "slug": "monaqo",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/monaqo-typo-white-62a47a31d832c-x2.png",
    "description": "Monaqo – B2B, App, & D2C E-commerce Growth Marketing Agency in Bangalore",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://monaqo.in/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2026-01-05T12:24:27.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 97,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "30"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 112,
        "name": "Native Advertising",
        "long_name": null,
        "slug": "native-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 89021,
    "name": "SeekNEO",
    "slug": "seekneo",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6979f016b2846-x2.png",
    "description": "Seekneo is a Bangalore based tech company building scalable Websites mobile app, UI/UX, and digital marketing solutions across India &amp; global markets.",
    "company_size": 50,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.seekneo.com",
    "claimed": true,
    "founded_year": 2010,
    "updated_at": "2026-01-28T17:24:53.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 97,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "7"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "6"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 53203,
    "name": "Tricon Infotech Private Limited",
    "slug": "tricon-infotech-private",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6899c39610a11-x2.png",
    "description": "Partnering with success",
    "company_size": 250,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://www.triconinfotech.com",
    "claimed": true,
    "founded_year": 1997,
    "updated_at": "2025-08-11T10:49:02.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "Hoboken",
        "slug": "hoboken"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 96,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 57080,
    "name": "Fusion Informatics Limited",
    "slug": "fusion-informatics",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/download-61a0866e497e2-x2.png",
    "description": "An offshore software development company, with expertise in web, mobile app, and custom software development based out of India, UAE, and the USA.",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.fusioninformatic.com/",
    "claimed": true,
    "founded_year": 2003,
    "updated_at": "2024-10-21T12:12:30.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 96,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 77110,
    "name": "Jordie's Creative Agency",
    "slug": "jordie-s-creative-agency",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68a9b7fe7fc02-x2.png",
    "description": "We build brands that people understand, remember, and return to.",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://jordiescreativeagency.com/",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2026-04-22T07:19:12.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 94,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 3
    },
    "services": [
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "16"
      },
      {
        "id": 33,
        "name": "Packaging Design",
        "long_name": null,
        "slug": "packaging-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "16"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "14"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "14"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 1
    }
  },
  {
    "id": 90550,
    "name": "GKN Collective",
    "slug": "gkn-collective",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69bcc955b3f9f-x2.png",
    "description": "Strategy Before Scale",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://gkncollective.com/",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2026-03-20T09:31:08.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 94,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 33,
        "name": "Packaging Design",
        "long_name": null,
        "slug": "packaging-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 1
    }
  },
  {
    "id": 80940,
    "name": "Zinavo Private Limited",
    "slug": "zinavo-private-limited",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-680f44082e84b-x2.png",
    "description": "Zinavo Private Limited is a professional web design, web applcaition,web development, Mobile apps and digital marketing company based in Bangalore.",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.zinavo.com/",
    "claimed": true,
    "founded_year": 2012,
    "updated_at": "2025-04-29T13:59:45.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 93,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "19"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 90723,
    "name": "Quantronsoft IT Consulting Pvt. Ltd.",
    "slug": "quantronsoft-it-consulting-pvt-ltd",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69c430807c2af-x2.png",
    "description": "Quantronsoft delivers AI, software, web development &amp; data analytics with industry training, helping businesses grow through smart digital innovation",
    "company_size": 50,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://www.quantronsoft.com/",
    "claimed": true,
    "founded_year": 2026,
    "updated_at": "2026-03-26T10:33:04.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 93,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "47"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "11"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 89939,
    "name": "Adze studio",
    "slug": "adze-studio",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69a54745c0caf-x2.png",
    "description": "Adze Studio is a Bangalore digital marketing company delivering performance-driven strategies for quality leads and brand growth.",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://adzestudio.com/",
    "claimed": true,
    "founded_year": 2015,
    "updated_at": "2026-03-02T11:26:53.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 93,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 28,
        "name": "Architectural Design",
        "long_name": null,
        "slug": "architectural-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 106,
        "name": "Motion Design",
        "long_name": null,
        "slug": "motion-design",
        "heading": null,
        "parent_id": 98,
        "is_new": true,
        "percentage": "6"
      },
      {
        "id": 107,
        "name": "3D Design",
        "long_name": null,
        "slug": "3d-design",
        "heading": null,
        "parent_id": 98,
        "is_new": true,
        "percentage": "6"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 35,
        "name": "Video Production",
        "long_name": null,
        "slug": "video-production",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 115,
        "name": "B2B Lead Generation",
        "long_name": null,
        "slug": "b2b-lead-generation",
        "heading": null,
        "parent_id": 96,
        "is_new": true,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 86940,
    "name": "Brandsaccord",
    "slug": "brandsaccord",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6917068b621ca-x2.png",
    "description": "Brands Accord delivers website development, branding, and digital marketing services to help businesses grow with smart, data-driven online strategies",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://brandsaccord.com/",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2025-11-14T11:26:14.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 93,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "50"
      },
      {
        "id": 39,
        "name": "Interior Design",
        "long_name": null,
        "slug": "interior-design",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 106,
        "name": "Motion Design",
        "long_name": null,
        "slug": "motion-design",
        "heading": null,
        "parent_id": 98,
        "is_new": true,
        "percentage": "10"
      },
      {
        "id": 110,
        "name": "Podcast Advertising",
        "long_name": null,
        "slug": "podcast-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "10"
      },
      {
        "id": 114,
        "name": "Public Service Advertising",
        "long_name": null,
        "slug": "public-service-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "10"
      },
      {
        "id": 102,
        "name": "Desktop App Development",
        "long_name": null,
        "slug": "desktop-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 91980,
    "name": "Zillion IT Solutions",
    "slug": "zillion-it-solutions",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69f83edfd7ca8-x2.png",
    "description": "We build scalable, high-performance software that helps businesses innovate faster, streamline operations, and gain a competitive edge.",
    "company_size": 2,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://zillionit.com/",
    "claimed": true,
    "founded_year": 2005,
    "updated_at": "2026-05-04T12:42:35.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Kozhikode",
        "slug": "kozhikode"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 93,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "45"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "40"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 87459,
    "name": "DeepKlarity",
    "slug": "deepklarity",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-698c641bc90b8-x2.png",
    "description": "AI Engineering Studio",
    "company_size": 2,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://deepklarity.com/",
    "claimed": true,
    "founded_year": 2018,
    "updated_at": "2026-02-11T11:14:34.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 93,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "20"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 62,
        "name": "Blockchain",
        "long_name": null,
        "slug": "blockchain",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 68952,
    "name": "Lumos Telos",
    "slug": "lumos-telos",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-65a9821486121-x2.png",
    "description": "Your Partner in data, business insights & MVP solutions",
    "company_size": 2,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://luxtelos.work",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2025-12-01T09:18:05.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Indore",
        "slug": "indore"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 93,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "7"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 43,
        "name": "BI & Big Data Consulting",
        "long_name": null,
        "slug": "bi-big-data-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "1"
      },
      {
        "id": 105,
        "name": "Accelerated Mobile Pages",
        "long_name": null,
        "slug": "accelerated-mobile-pages",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 27873,
    "name": "Adroitte",
    "slug": "adroitte",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/27873/4640ff12999ab04524072a56a633ed88.png",
    "description": "Digital Marketing & Website Development Company in Bangalore",
    "company_size": 10,
    "hourly_rate": 250,
    "is_featured": false,
    "website": "https://www.adroitte.com/",
    "claimed": true,
    "founded_year": 2010,
    "updated_at": "2025-05-02T12:29:28.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 92,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 3
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "25"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 5
    }
  },
  {
    "id": 92457,
    "name": "Revver Services",
    "slug": "revver-services",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6a06c6e43f10a-x2.png",
    "description": "Revver Services helps hotels, resorts, homestays and villas to grow online with SEO, ads, websites, and smart digital marketing solutions.",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://www.revverservices.com/",
    "claimed": true,
    "founded_year": 2025,
    "updated_at": "2026-05-15T08:29:17.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 92,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "25"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 89733,
    "name": "Ralecon",
    "slug": "ralecon",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-699c201205dd9-x2.png",
    "description": "A Decade of Digital Excellence . We specialize in delivering ROI-based digital marketing solutions that have a high success rate for our clients.",
    "company_size": 50,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://www.ralecon.com/",
    "claimed": true,
    "founded_year": 2012,
    "updated_at": "2026-02-23T09:50:45.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 91,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "80"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 24486,
    "name": "Incognito Worldwide",
    "slug": "incognito-worldwide",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/24486/7bd4db07983cb877366ee03fcbefe3b0.jpeg",
    "description": "Empower Your Brand Worldwide",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "http://www.incognitoworldwide.com",
    "claimed": true,
    "founded_year": 2015,
    "updated_at": "2025-12-03T06:17:35.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "Wilmington",
        "slug": "wilmington"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 91,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "43"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "26"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "6"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 4
    }
  },
  {
    "id": 89733,
    "name": "Ralecon",
    "slug": "ralecon",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-699c201205dd9-x2.png",
    "description": "A Decade of Digital Excellence . We specialize in delivering ROI-based digital marketing solutions that have a high success rate for our clients.",
    "company_size": 50,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://www.ralecon.com/",
    "claimed": true,
    "founded_year": 2012,
    "updated_at": "2026-02-23T09:50:45.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 91,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "80"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 91070,
    "name": "Createxp Labs",
    "slug": "createxp-labs",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69d3b4ed17021-x2.png",
    "description": "CREATEXP is a design and development studio that builds websites, MVPs, and custom software for startups and enterprises across the globe.",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://createxp.in/",
    "claimed": true,
    "founded_year": 2023,
    "updated_at": "2026-04-06T14:08:02.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 90,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "10"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 57230,
    "name": "Fameweb - Digital Transformation",
    "slug": "fameweb",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/57230/fameweb-61b71969c944c.png",
    "description": "A young fast-growing Branding and AI-based agency serving CGI Ads, UI/UX Design, Web/App Development & SEO Services.\n\n|| Digital Transformation ||",
    "company_size": 2,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://fameweb.in",
    "claimed": true,
    "founded_year": 2019,
    "updated_at": "2024-11-09T13:02:30.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Gurugram",
        "slug": "gurugram"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 90,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 33,
        "name": "Packaging Design",
        "long_name": null,
        "slug": "packaging-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 62,
        "name": "Blockchain",
        "long_name": null,
        "slug": "blockchain",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 35,
        "name": "Video Production",
        "long_name": null,
        "slug": "video-production",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 86463,
    "name": "Ekfrazo Technologies",
    "slug": "ekfrazo-technologies",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6901d4ee6a7cd-x2.png",
    "description": "Our enterprise systems help businesses cut costs by 40%, reclaim 20+ hours each week through automation, and secure operations against cyber risks.",
    "company_size": 50,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://ekfrazo.com/",
    "claimed": true,
    "founded_year": 2015,
    "updated_at": "2025-10-29T17:38:34.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 90,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 102,
        "name": "Desktop App Development",
        "long_name": null,
        "slug": "desktop-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 49,
        "name": "Cybersecurity",
        "long_name": null,
        "slug": "cybersecurity",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 118,
        "name": "Oracle Consultancy",
        "long_name": "<span>Oracle</span> Consultancy",
        "slug": "oracle",
        "heading": null,
        "parent_id": 99,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 115,
        "name": "B2B Lead Generation",
        "long_name": null,
        "slug": "b2b-lead-generation",
        "heading": null,
        "parent_id": 96,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 105,
        "name": "Accelerated Mobile Pages",
        "long_name": null,
        "slug": "accelerated-mobile-pages",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 56337,
    "name": "Innover Digital",
    "slug": "innover-digital",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-686cc17d198f5-x2.png",
    "description": "AI-first engineering solutions strategically designed to unlock business value and intelligently propel enterprises ahead",
    "company_size": 1000,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://www.innoverdigital.com/",
    "claimed": true,
    "founded_year": 2020,
    "updated_at": "2025-07-11T07:46:48.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "Alpharetta",
        "slug": "alpharetta"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 90,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "20"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 83225,
    "name": "MCUBE",
    "slug": "mcube",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6874cb99de1bb-x2.png",
    "description": "MCUBE delivers smart cloud telephony solutions that simplify customer communication and boost business efficiency across all touchpoints.",
    "company_size": 250,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://mcube.com/mcube-ivr/",
    "claimed": true,
    "founded_year": 2009,
    "updated_at": "2025-09-17T12:15:59.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 90,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 115,
        "name": "B2B Lead Generation",
        "long_name": null,
        "slug": "b2b-lead-generation",
        "heading": null,
        "parent_id": 96,
        "is_new": true,
        "percentage": "19"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "17"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "16"
      },
      {
        "id": 75,
        "name": "Corporate Training",
        "long_name": null,
        "slug": "corporate-training",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 108,
        "name": "Voice Search Optimization",
        "long_name": null,
        "slug": "voice-search-optimization",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "6"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "4"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 52146,
    "name": "WEBDIGITA",
    "slug": "webdigita",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/52146/250x250_1.png",
    "description": "Accelerating Digital Transformation",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.webdigita.com/",
    "claimed": true,
    "founded_year": 2012,
    "updated_at": "2026-02-16T09:28:28.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Chennai",
        "slug": "chennai"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 88,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "75"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 82970,
    "name": "SAS ONE PRIVATE LIMITED",
    "slug": "sas-one-private-limited",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-686b9c81cd8d6-x2.png",
    "description": "Partner for Software, Apps &amp; Embedded Systems",
    "company_size": 50,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://www.sasone.in/",
    "claimed": true,
    "founded_year": 2021,
    "updated_at": "2025-07-07T12:27:14.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Lucknow",
        "slug": "lucknow"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 88,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "29"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "22"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "18"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "14"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 68876,
    "name": "LaunchX Labs Pvt Ltd",
    "slug": "launchx-labs-pvt-ltd",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-65a6257adbd9c-x2.png",
    "description": "We empower startups and businesses to transform ideas into AI-driven digital products through expert software development and strategic partnerships.",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://launchxlabs.ai/",
    "claimed": true,
    "founded_year": 2023,
    "updated_at": "2025-01-13T11:46:08.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 88,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "40"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 43,
        "name": "BI & Big Data Consulting",
        "long_name": null,
        "slug": "bi-big-data-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 91318,
    "name": "Brandemic India LLP",
    "slug": "brandemic-india-llp",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69ddf8ccb8d7d-x2.png",
    "description": "Brandemic is a creative branding agency offering brand strategy, digital identity, &amp; marketing solutions to help businesses grow and stand out online.",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://brandemic.in/",
    "claimed": true,
    "founded_year": 2020,
    "updated_at": "2026-04-14T14:40:08.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 88,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 35,
        "name": "Video Production",
        "long_name": null,
        "slug": "video-production",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 32,
        "name": "Print Design",
        "long_name": null,
        "slug": "print-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 33,
        "name": "Packaging Design",
        "long_name": null,
        "slug": "packaging-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 115,
        "name": "B2B Lead Generation",
        "long_name": null,
        "slug": "b2b-lead-generation",
        "heading": null,
        "parent_id": 96,
        "is_new": true,
        "percentage": "4"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 106,
        "name": "Motion Design",
        "long_name": null,
        "slug": "motion-design",
        "heading": null,
        "parent_id": 98,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 12,
        "name": "Event Marketing & Planning",
        "long_name": null,
        "slug": "event-marketing-planning",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 47041,
    "name": "Tech Exactly",
    "slug": "tech-exactly",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/47041/308c611ffc32d0c08de731a6fa699465.jpeg",
    "description": "Helping Founders Get Their Dream App",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.techexactly.com/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2026-04-08T09:56:38.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Kolkata",
        "slug": "kolkata"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 88,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "75"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "4.6",
      "total": 5
    }
  },
  {
    "id": 56627,
    "name": "MAP Systems",
    "slug": "map-systems",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/map-systems-logo-6152dce50f639-x2.jpg",
    "description": "ePub Conversion| Photo Editing| Graphics Design| 3D Graphics",
    "company_size": 50,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://mapsystemsindia.com/",
    "claimed": true,
    "founded_year": 1993,
    "updated_at": "2025-08-20T09:51:11.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 87,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 3
    },
    "services": [
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "37"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "35"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "21"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "7"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 1
    }
  },
  {
    "id": 82445,
    "name": "Mydbops",
    "slug": "mydbops",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68529f08baf04-x2.png",
    "description": "Mydbops offers expert database consulting, management, and support services tailored for PostgreSQL and MySQL environments.",
    "company_size": 50,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://www.mydbops.com/",
    "claimed": true,
    "founded_year": 2015,
    "updated_at": "2026-04-10T02:45:19.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 87,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "35"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "30"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 21009,
    "name": "Jootoor Designs",
    "slug": "jootoor-designs",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/21009/jootoor_icon.png",
    "description": "We design your imagination",
    "company_size": 2,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "http://www.jootoor.com",
    "claimed": true,
    "founded_year": 2010,
    "updated_at": "2025-04-29T07:04:29.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 87,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "35"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "30"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 5
    }
  },
  {
    "id": 88872,
    "name": "Frenxt AI Consultancy",
    "slug": "frenxt-ai-consultancy",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6972f6f30ae65-x2.png",
    "description": "Building custom AI solutions, LLM integrations, and modern web applications for startups and growing businesses",
    "company_size": 2,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.frenxt.com/",
    "claimed": true,
    "founded_year": 2025,
    "updated_at": "2026-01-23T08:27:28.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 86,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "50"
      },
      {
        "id": 28,
        "name": "Architectural Design",
        "long_name": null,
        "slug": "architectural-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 43,
        "name": "BI & Big Data Consulting",
        "long_name": null,
        "slug": "bi-big-data-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 105,
        "name": "Accelerated Mobile Pages",
        "long_name": null,
        "slug": "accelerated-mobile-pages",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 51955,
    "name": "Zethic Technologies",
    "slug": "zethic-technologies",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/51955/zethic-logo-new-min.png",
    "description": "Creative Tech Studio",
    "company_size": 2,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "http://zethic.com",
    "claimed": true,
    "founded_year": 2020,
    "updated_at": "2026-01-13T09:20:59.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 86,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 82480,
    "name": "Blute Technologies Pvt Ltd",
    "slug": "blute-technologies-pvt-ltd",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6853f0a43bef8-x2.png",
    "description": "Blute Technologies is a IT application development services company and outsourcing partner for clients in all industries.",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.blute.co.in/",
    "claimed": true,
    "founded_year": 2019,
    "updated_at": "2025-06-19T10:57:36.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 86,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "35"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 76965,
    "name": "Chipsy IT Services Pvt Ltd.",
    "slug": "chipsy-information-technology-services-pvt-ltd",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-674da1dd8209b-x2.png",
    "description": "Innovating Solutions, Empowering Success.",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.chipsyservices.com/",
    "claimed": true,
    "founded_year": 2012,
    "updated_at": "2025-08-14T09:00:30.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Udupi",
        "slug": "udupi"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 86,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 80234,
    "name": "Eeatminds",
    "slug": "eeatminds",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-67ea7b366a3bf-x2.png",
    "description": "Leading Digital marketing freelancer in Bangalore, India",
    "company_size": 10,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://www.eeatminds.in/",
    "claimed": true,
    "founded_year": 2015,
    "updated_at": "2025-07-28T06:20:06.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 85,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "36"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 13,
        "name": "Other Marketing",
        "long_name": null,
        "slug": "other-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 21,
        "name": "Conversion Optimization",
        "long_name": null,
        "slug": "conversion-optimization",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 84542,
    "name": "VinayPN Online Services Bangalore",
    "slug": "vinaypn-online-services-bangalore",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68aca797ab19b-x2.png",
    "description": "VinayPN.com is a top Web Design Company Bangalore offering expert website design, development, SEO, and digital marketing services in Bangalore.",
    "company_size": 2,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://vinaypn.com/",
    "claimed": true,
    "founded_year": 2014,
    "updated_at": "2025-08-26T06:21:44.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 85,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "50"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "40"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 91149,
    "name": "Sietrix Technologies",
    "slug": "sietrix-technologies",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69d65adab6cda-x2.png",
    "description": "Full-service tech partner delivering web &amp; mobile apps, custom software, and CRM solutions to build scalable, efficient digital systems.",
    "company_size": 2,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://sietrix.com/",
    "claimed": true,
    "founded_year": 2026,
    "updated_at": "2026-04-08T14:28:43.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 85,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 18500,
    "name": "Loud Mob Media",
    "slug": "loud-mob-media",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/18500/a83c41b3ce4d16c76b63278713b525d5.png",
    "description": "We are a design, strategy, technology and marketing agency for the loud, the nimble and the game-changers! From small businesses to shark tank winners...",
    "company_size": 2,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://www.loudmob.media",
    "claimed": false,
    "founded_year": 2017,
    "updated_at": "2023-10-16T07:51:57.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Pune",
        "slug": "pune"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 125,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 33,
        "name": "Packaging Design",
        "long_name": null,
        "slug": "packaging-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "4.2",
      "total": 5
    }
  },
  {
    "id": 85762,
    "name": "DerivateX",
    "slug": "derivate-x",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68e4e170181f4-x2.png",
    "description": "We offer LLM SEO as a service, helping SaaS brands get discovered not just on Google, but inside AI tools like ChatGPT, Perplexity, Gemini, and Claude",
    "company_size": 10,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://derivatex.agency/",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2026-04-16T06:01:59.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 84,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "34"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "33"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "33"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 2
    }
  },
  {
    "id": 58053,
    "name": "Hyena Information Technologies",
    "slug": "hyena-information-technologies",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/hyena-logo-623080e32060a-x2.png",
    "description": "Hyena Information Technologies is the most trusted software development company in bangalore, India with expertise in Mobile App Development.",
    "company_size": 50,
    "hourly_rate": 150,
    "is_featured": false,
    "website": "https://www.hyena.ai/",
    "claimed": true,
    "founded_year": 1999,
    "updated_at": "2025-03-18T05:32:47.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 84,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 3,
      "year_2025": 3
    },
    "services": [
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "45"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "4.8",
      "total": 2
    }
  },
  {
    "id": 84578,
    "name": "PixxelCodeLabs",
    "slug": "pixxelcodelabs",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/84578/1730992368872-68afe989b84c8.jfif",
    "description": "At PixxelCodeLabs, we are more than just a digital agency&mdash;we are your strategic partners in crafting engaging experiences, create innovative solutions",
    "company_size": 50,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://pixxelcodelabs.com",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2025-08-28T05:30:50.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 84,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 87068,
    "name": "SEOBangalore",
    "slug": "seobangalore",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-691d853a03438-x2.png",
    "description": "Leading SEO Company in Bangalore with 13+ years of expertise Experts in AEO, SXO, GEO, City-Based & Technical SEO.",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.seobangalore.in/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2026-05-08T09:00:41.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 84,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "30"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 13,
        "name": "Other Marketing",
        "long_name": null,
        "slug": "other-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 108,
        "name": "Voice Search Optimization",
        "long_name": null,
        "slug": "voice-search-optimization",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "10"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 51881,
    "name": "doodleblue Innovations",
    "slug": "doodleblue",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/51881/logo-with-spacing.png",
    "description": "Digital Strategy Consulting",
    "company_size": 50,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "http://www.doodleblue.com/",
    "claimed": true,
    "founded_year": 2012,
    "updated_at": "2025-07-17T08:33:08.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Chennai",
        "slug": "chennai"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 84,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "45"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 50731,
    "name": "Synclovis Systems Pvt. Ltd.",
    "slug": "synclovis-systems",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/50731/synclovis_logo.png",
    "description": "Customized Mobile & Web Apps Development",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "http://www.synclovis.com",
    "claimed": true,
    "founded_year": 2014,
    "updated_at": "2025-04-29T07:04:26.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 83,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "40"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 78978,
    "name": "Devout Growth",
    "slug": "devout-growth",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-67b03fc659099-x2.png",
    "description": "Devout Growth is a top digital marketing agency in India that helps businesses grow online.",
    "company_size": 50,
    "hourly_rate": 150,
    "is_featured": false,
    "website": "https://www.devoutgrowth.com/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2025-04-07T06:39:21.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Patna",
        "slug": "patna"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 82,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 8,
        "name": "PR",
        "long_name": null,
        "slug": "pr",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 7,
        "name": "Direct Marketing",
        "long_name": null,
        "slug": "direct-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 11,
        "name": "Media Planning & Buying",
        "long_name": null,
        "slug": "media-planning-buying",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 12,
        "name": "Event Marketing & Planning",
        "long_name": null,
        "slug": "event-marketing-planning",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 13,
        "name": "Other Marketing",
        "long_name": null,
        "slug": "other-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 20,
        "name": "Affiliate Marketing",
        "long_name": null,
        "slug": "affiliate-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 21,
        "name": "Conversion Optimization",
        "long_name": null,
        "slug": "conversion-optimization",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 35,
        "name": "Video Production",
        "long_name": null,
        "slug": "video-production",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 36,
        "name": "Broadcast Video",
        "long_name": null,
        "slug": "broadcast-video",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 38,
        "name": "Corporate Photography",
        "long_name": null,
        "slug": "corporate-photography",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 70,
        "name": "Voice",
        "long_name": null,
        "slug": "voice-services",
        "heading": "Top Companies providing <span>Voice</span> communication services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 74,
        "name": "Translation",
        "long_name": null,
        "slug": "translation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 75,
        "name": "Corporate Training",
        "long_name": null,
        "slug": "corporate-training",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 83,
        "name": "Contract Manufacturing",
        "long_name": null,
        "slug": "contract-manufacturing",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 91,
        "name": "Warehousing & Distribution",
        "long_name": null,
        "slug": "warehousing-distribution",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 68958,
    "name": "Persistent Systems",
    "slug": "persistent-systems",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-65aa0ed0e1839-x2.png",
    "description": "See Beyond, Rise Above",
    "company_size": 10000,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://www.persistent.com/",
    "claimed": true,
    "founded_year": 1990,
    "updated_at": "2024-07-25T10:22:28.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Pune",
        "slug": "pune"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 82,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 49,
        "name": "Cybersecurity",
        "long_name": null,
        "slug": "cybersecurity",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 43,
        "name": "BI & Big Data Consulting",
        "long_name": null,
        "slug": "bi-big-data-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 59,
        "name": "AR/VR Development",
        "long_name": null,
        "slug": "ar-vr-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 62,
        "name": "Blockchain",
        "long_name": null,
        "slug": "blockchain",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 116,
        "name": "IBM Consultancy",
        "long_name": "<span>IBM</span> Consultancy",
        "slug": "ibm",
        "heading": null,
        "parent_id": 99,
        "is_new": true,
        "percentage": "1"
      },
      {
        "id": 117,
        "name": "HP Consultancy",
        "long_name": "<span>HP</span> Consultancy",
        "slug": "hp",
        "heading": null,
        "parent_id": 99,
        "is_new": true,
        "percentage": "1"
      },
      {
        "id": 118,
        "name": "Oracle Consultancy",
        "long_name": "<span>Oracle</span> Consultancy",
        "slug": "oracle",
        "heading": null,
        "parent_id": 99,
        "is_new": true,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 66568,
    "name": "Arffy Technologies Private limited",
    "slug": "arffy-technologies-private-limited",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69fe4ce89375a-x2.png",
    "description": "Arffy Technologies Private limited is a dynamic software company known for its innovative solutions and commitment to excellence in the tech industry.",
    "company_size": 50,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.arffy.com/",
    "claimed": true,
    "founded_year": 2022,
    "updated_at": "2026-05-08T20:57:07.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 82,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "16"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 62,
        "name": "Blockchain",
        "long_name": null,
        "slug": "blockchain",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 49,
        "name": "Cybersecurity",
        "long_name": null,
        "slug": "cybersecurity",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 43,
        "name": "BI & Big Data Consulting",
        "long_name": null,
        "slug": "bi-big-data-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 72348,
    "name": "Founders Media",
    "slug": "founders-media",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-66630a3bbe30f-x2.png",
    "description": "Healthcare &amp; Realestate Marketing Experts",
    "company_size": 2,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://foundersmedia.in/",
    "claimed": true,
    "founded_year": 2020,
    "updated_at": "2026-05-16T01:55:32.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 82,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 32,
        "name": "Print Design",
        "long_name": null,
        "slug": "print-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 2
    }
  },
  {
    "id": 91525,
    "name": "Market Kapchur",
    "slug": "market-kapchur",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69e5fd7327dd7-x2.png",
    "description": "Market Kapchur is a digital marketing company providing SEO, Performance Marketing, &amp; Brand Development.",
    "company_size": 10,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://marketkapchur.com/",
    "claimed": true,
    "founded_year": 2023,
    "updated_at": "2026-04-20T14:48:39.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 82,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 39,
        "name": "Interior Design",
        "long_name": null,
        "slug": "interior-design",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 107,
        "name": "3D Design",
        "long_name": null,
        "slug": "3d-design",
        "heading": null,
        "parent_id": 98,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 108,
        "name": "Voice Search Optimization",
        "long_name": null,
        "slug": "voice-search-optimization",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 34,
        "name": "Outdoor Advertising",
        "long_name": null,
        "slug": "outdoor-advertising",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 56779,
    "name": "ThePro3DStudio",
    "slug": "thepro3dstudio",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-650970cabdd86-x2.png",
    "description": "3D Design Studio",
    "company_size": 50,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://professional3dservices.com/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2023-12-22T11:50:52.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 81,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "60"
      },
      {
        "id": 28,
        "name": "Architectural Design",
        "long_name": null,
        "slug": "architectural-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "30"
      },
      {
        "id": 33,
        "name": "Packaging Design",
        "long_name": null,
        "slug": "packaging-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 1
    }
  },
  {
    "id": 52321,
    "name": "AppsWise Technologies",
    "slug": "appswise-technologies",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/52321/5e017f2c4f173b3ab6c35350ffd1d222.png",
    "description": "Application wise technologies implementaion!",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://appswise.com",
    "claimed": true,
    "founded_year": 2016,
    "updated_at": "2025-06-06T13:40:34.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 81,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "23"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 62,
        "name": "Blockchain",
        "long_name": null,
        "slug": "blockchain",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 79788,
    "name": "Mathew Digital",
    "slug": "mathew-digital",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6969e7886d44d-x2.png",
    "description": "Digital Marketing Agency in Bangalore | Growth Focused Performance Marketing for B2B and D2C. Lead-gen & revenue growth.",
    "company_size": 10,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://mathewdigital.com/",
    "claimed": true,
    "founded_year": 2016,
    "updated_at": "2026-01-16T07:29:14.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 81,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "18"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 7,
        "name": "Direct Marketing",
        "long_name": null,
        "slug": "direct-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 20099,
    "name": "First Launch - A Full Service Marketing Agency",
    "slug": "first-launch",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6576ddc49f9f9-x2.png",
    "description": "A full-service marketing agency from Bangalore, India, providing digital marketing, visual (branding, graphic design) & website development solutions.",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://firstlaunch.in/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2024-12-17T08:16:49.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 81,
    "awards_count": {
      "year_2023": 3,
      "year_2024": 3,
      "year_2025": 3
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "18"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "17"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 5
    }
  },
  {
    "id": 77346,
    "name": "Scool360",
    "slug": "scool360",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-676169fcb41c0-x2.png",
    "description": "Scool360 is a school management software designed to streamline administrative tasks, enhance communication, and optimize educational processes.",
    "company_size": 50,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://scool360.com/",
    "claimed": true,
    "founded_year": 2019,
    "updated_at": "2024-12-17T12:45:21.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 81,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 7,
        "name": "Direct Marketing",
        "long_name": null,
        "slug": "direct-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 11,
        "name": "Media Planning & Buying",
        "long_name": null,
        "slug": "media-planning-buying",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 13,
        "name": "Other Marketing",
        "long_name": null,
        "slug": "other-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 8,
        "name": "PR",
        "long_name": null,
        "slug": "pr",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 28,
        "name": "Architectural Design",
        "long_name": null,
        "slug": "architectural-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 32,
        "name": "Print Design",
        "long_name": null,
        "slug": "print-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 33,
        "name": "Packaging Design",
        "long_name": null,
        "slug": "packaging-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 43,
        "name": "BI & Big Data Consulting",
        "long_name": null,
        "slug": "bi-big-data-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 77690,
    "name": "NAVAM Digital LLC",
    "slug": "navam-digital-llc",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6775aed7c04ae-x2.png",
    "description": "Transforming tomorrow&#39;s digital landscape with innovative solutions, leveraging technology to drive growth and complete business transformations.",
    "company_size": 2,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://navamdigital.com/",
    "claimed": true,
    "founded_year": 2023,
    "updated_at": "2025-01-02T09:27:40.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "Valencia, CA",
        "slug": "valencia-ca"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 81,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 82322,
    "name": "Tonse Business Solutions",
    "slug": "tonse-business-solutions",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-684eb7415553d-x2.png",
    "description": "Tonsetech is a global-first technology company enabling Indian businesses to scale smarter with tailored, industry-ready digital solutions.",
    "company_size": 50,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://tonsetech.com",
    "claimed": true,
    "founded_year": 2014,
    "updated_at": "2025-06-16T10:10:42.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 80,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "13"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "11"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 59,
        "name": "AR/VR Development",
        "long_name": null,
        "slug": "ar-vr-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "6"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 105,
        "name": "Accelerated Mobile Pages",
        "long_name": null,
        "slug": "accelerated-mobile-pages",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "3"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 49414,
    "name": "GoodWorkLabs",
    "slug": "goodworklabs",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6503f43d2b795-x2.png",
    "description": "Leading Tech & Digital Transformation Company",
    "company_size": 50,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "http://www.goodworklabs.com",
    "claimed": true,
    "founded_year": 2012,
    "updated_at": "2024-03-07T08:45:56.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 80,
    "awards_count": {
      "year_2023": 3,
      "year_2024": 3,
      "year_2025": 3
    },
    "services": [
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "50"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 59,
        "name": "AR/VR Development",
        "long_name": null,
        "slug": "ar-vr-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "4.7",
      "total": 12
    }
  },
  {
    "id": 47106,
    "name": "Juego Studios",
    "slug": "juego-studios",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/47106/juego_studios.png",
    "description": "Top Game and App Development Company",
    "company_size": 250,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.juegostudio.com/",
    "claimed": true,
    "founded_year": 2013,
    "updated_at": "2024-01-23T00:08:20.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "California",
        "slug": "california"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 80,
    "awards_count": {
      "year_2023": 3,
      "year_2024": 3,
      "year_2025": 3
    },
    "services": [
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 59,
        "name": "AR/VR Development",
        "long_name": null,
        "slug": "ar-vr-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 57,
        "name": "Wearable App Development",
        "long_name": null,
        "slug": "wearable-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 10
    }
  },
  {
    "id": 84793,
    "name": "TransformEdge",
    "slug": "transformedge",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/84793/transformedge-enterprise-services-p-ltd-logo-68b818c50ab9e.jfif",
    "description": "End to End Cloud ERP Implementations , Integrations and AI Driven Process Automation Specialist, ERP Focused Agentic AI Consulting Solutions Provider",
    "company_size": 50,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://transformedge.com",
    "claimed": true,
    "founded_year": 2016,
    "updated_at": "2025-09-03T10:30:29.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "Wilmington DE",
        "slug": "wilmington-de"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 80,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 118,
        "name": "Oracle Consultancy",
        "long_name": "<span>Oracle</span> Consultancy",
        "slug": "oracle",
        "heading": null,
        "parent_id": 99,
        "is_new": true,
        "percentage": "22"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "18"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "18"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "16"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "16"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 90496,
    "name": "Athena Business Solutions",
    "slug": "athena-business-solutions",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69ba648454558-x2.png",
    "description": "Athena Business Solutions is a digital marketing agency that helps businesses grow through marketing, branding, and digital strategy.",
    "company_size": 10,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://athenabizsolutions.com/",
    "claimed": true,
    "founded_year": 2018,
    "updated_at": "2026-03-23T06:51:01.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 80,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "30"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "25"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 84953,
    "name": "Onboardnow",
    "slug": "onboardnow",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68bff888f0f9e-x2.png",
    "description": "One-stop hiring: Pre-vetted domain experts, time-zone aligned, onboarded in 48h to blend seamlessly with your team",
    "company_size": 50,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://www.onboardnow.ai/",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2025-09-09T10:54:13.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 79,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "70"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "30"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 90247,
    "name": "FusionEventz",
    "slug": "fusioneventz",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69b129c9659ac-x2.png",
    "description": "FusionEventz is a leading event management company based in Bangalore. Best Corporate Event Management Company in Bangalore",
    "company_size": 2,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://fusioneventz.in",
    "claimed": true,
    "founded_year": 2014,
    "updated_at": "2026-03-11T10:34:44.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 79,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 12,
        "name": "Event Marketing & Planning",
        "long_name": null,
        "slug": "event-marketing-planning",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "55"
      },
      {
        "id": 114,
        "name": "Public Service Advertising",
        "long_name": null,
        "slug": "public-service-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "6"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 110,
        "name": "Podcast Advertising",
        "long_name": null,
        "slug": "podcast-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 111,
        "name": "Mobile Advertising",
        "long_name": null,
        "slug": "mobile-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 13,
        "name": "Other Marketing",
        "long_name": null,
        "slug": "other-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 38,
        "name": "Corporate Photography",
        "long_name": null,
        "slug": "corporate-photography",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 113,
        "name": "Guerilla Advertising",
        "long_name": null,
        "slug": "guerilla-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 11,
        "name": "Media Planning & Buying",
        "long_name": null,
        "slug": "media-planning-buying",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 75,
        "name": "Corporate Training",
        "long_name": null,
        "slug": "corporate-training",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 115,
        "name": "B2B Lead Generation",
        "long_name": null,
        "slug": "b2b-lead-generation",
        "heading": null,
        "parent_id": 96,
        "is_new": true,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 83552,
    "name": "Shrote Technology",
    "slug": "shrote-technology",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68835266c72af-x2.png",
    "description": "Shrote Technology delivers innovative web, software, and digital solutions, turning ideas into reality with the motto -- Your Vision, Our Code.",
    "company_size": 50,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.shrote.com",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2025-12-20T16:26:10.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 79,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "11"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 77465,
    "name": "nxuniq",
    "slug": "nxuniq",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-676903c9269fd-x2.png",
    "description": "nxuniq is the best digital marketing agency in Bangalore that focuses on brand aesthetics and the creation of unique digital content.",
    "company_size": 2,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://nxuniq.com/",
    "claimed": true,
    "founded_year": 2021,
    "updated_at": "2025-12-08T09:25:06.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 78,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 13,
        "name": "Other Marketing",
        "long_name": null,
        "slug": "other-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "34"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "14"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 83232,
    "name": "Digital SVP",
    "slug": "digital-svp",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6874dc38f3982-x2.png",
    "description": "Shreyas V Patil, Leading Freelance Digital Marketer In Bangalore, India with 10+ years of Expirence in SEO, SEM, SMO, SMM, Web Design/Dev.",
    "company_size": 1,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.digitalsvp.com/",
    "claimed": true,
    "founded_year": 2020,
    "updated_at": "2025-07-14T15:28:58.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 78,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 79428,
    "name": "MARS Web Solution",
    "slug": "mars-web-solution",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-67c55f668b589-x2.png",
    "description": "MARS Web Solutions is a passionate, creative team dedicated to delivering exceptional web design and top-notch development services.",
    "company_size": 10,
    "hourly_rate": 0,
    "is_featured": false,
    "website": "https://www.marswebsolution.com/",
    "claimed": true,
    "founded_year": 2007,
    "updated_at": "2026-01-30T07:51:56.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 78,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 84725,
    "name": "HVJ & Associates",
    "slug": "hvj-associates",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68b46286633c9-x2.png",
    "description": "HVJ &amp; Associates is a trusted Chartered Accountants firm in Bangalore providing expert accounting, auditing, taxation, and business advisory services",
    "company_size": 50,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://hvj.co.in/",
    "claimed": true,
    "founded_year": 2006,
    "updated_at": "2025-09-01T08:40:28.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 77,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 72,
        "name": "Finance & Accounting Outsourcing (FAO)",
        "long_name": null,
        "slug": "finance-accounting-outsourcing-fao",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "100"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 83085,
    "name": "Alp Consulting Ltd",
    "slug": "alp-consulting-ltd",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-686f53d906080-x2.png",
    "description": "Alp Consulting is a leading Indian HR &amp;staffing firm, offering tailored recruitment, payroll, and outsourcing solutions to global clients Since 1996",
    "company_size": 1000,
    "hourly_rate": 150,
    "is_featured": false,
    "website": "https://alp.consulting/",
    "claimed": true,
    "founded_year": 1996,
    "updated_at": "2025-07-10T06:48:37.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 77,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "40"
      },
      {
        "id": 69,
        "name": "Human Resources",
        "long_name": null,
        "slug": "human-resources",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "40"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "20"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 85223,
    "name": "Indo-Sakura Software Japan K.K.",
    "slug": "indo-sakura-software-japan-k-k",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68ca85fedac80-x2.png",
    "description": "AI-driven software and mobile app solutions, empowering businesses with innovation and scalable technology.",
    "company_size": 50,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://indosakura.com/",
    "claimed": true,
    "founded_year": 2005,
    "updated_at": "2025-09-17T16:30:03.000000Z",
    "headquarter": {
      "country": {
        "name": "Japan",
        "slug": "japan"
      },
      "city": {
        "name": "Tokyo",
        "slug": "tokyo"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 77,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "25"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 47487,
    "name": "Specbee",
    "slug": "specbee",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/47487/new_specbee_logo.png",
    "description": "Specbee builds content management solutions on Drupal that can accelerate your business growth.",
    "company_size": 50,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://www.specbee.com/",
    "claimed": true,
    "founded_year": 2016,
    "updated_at": "2024-11-08T10:19:17.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "Atlanta",
        "slug": "atlanta"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 77,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 3,
      "year_2025": 3
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "41"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "4.8",
      "total": 5
    }
  },
  {
    "id": 90884,
    "name": "Digitalpix",
    "slug": "digitalpix",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69cb93b239a92-x2.png",
    "description": "Digitalpix is a digital agency delivering tailored marketing, branding, and web solutions to help businesses grow and succeed online.",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://digitalpix.in/",
    "claimed": true,
    "founded_year": 2020,
    "updated_at": "2026-03-31T15:36:31.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 77,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "35"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "35"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 88440,
    "name": "MN Service Providers",
    "slug": "mn-service-providers",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-695f91174e8f9-x2.png",
    "description": "We are a leading AI-driven IT services provider in India, dedicated to empowering startups, contractors, and facilities management firms.",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.mnserviceproviders.com/",
    "claimed": true,
    "founded_year": 2007,
    "updated_at": "2026-01-08T12:04:33.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 75,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 115,
        "name": "B2B Lead Generation",
        "long_name": null,
        "slug": "b2b-lead-generation",
        "heading": null,
        "parent_id": 96,
        "is_new": true,
        "percentage": "5"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 92364,
    "name": "DigiMantra",
    "slug": "digimantra",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6a04424da77ff-x2.png",
    "description": "DigiMantra is an AI-driven software and digital transformation company helping businesses build web, mobile, cloud, &amp; automation solutions that scale.",
    "company_size": 250,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://digimantra.com/",
    "claimed": true,
    "founded_year": 2012,
    "updated_at": "2026-05-13T16:10:55.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Punjab",
        "slug": "punjab"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 75,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 51,
        "name": "IT Staff Augmentation",
        "long_name": null,
        "slug": "it-staff-augmentation",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "12"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 91449,
    "name": "Confe Systems",
    "slug": "confe-systems",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-69e20e679f5f8-x2.png",
    "description": "More than a software development company, we build business growth engines.",
    "company_size": 2,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://confemedia.com/",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2026-04-17T14:09:58.000000Z",
    "headquarter": {
      "country": {
        "name": "United States",
        "slug": "united-states"
      },
      "city": {
        "name": "Denver",
        "slug": "denver"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 75,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "8"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 102,
        "name": "Desktop App Development",
        "long_name": null,
        "slug": "desktop-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 105,
        "name": "Accelerated Mobile Pages",
        "long_name": null,
        "slug": "accelerated-mobile-pages",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "4"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 56659,
    "name": "Spear Growth",
    "slug": "spear-growth",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/group-103-61561cf7aae54-x2.png",
    "description": "Ads & SEO for B2B SaaS Companies",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://speargrowth.com",
    "claimed": true,
    "founded_year": 2021,
    "updated_at": "2023-06-19T07:33:48.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Ghaziabad",
        "slug": "ghaziabad"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 75,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 11,
        "name": "Media Planning & Buying",
        "long_name": null,
        "slug": "media-planning-buying",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 21,
        "name": "Conversion Optimization",
        "long_name": null,
        "slug": "conversion-optimization",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 77212,
    "name": "Back B solutions LLP",
    "slug": "back-b-solutions-llp",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-675ab05768290-x2.png",
    "description": "Back B is a top website design and development company, offering custom solutions in e-commerce, WordPress, and more to drive business growth online.",
    "company_size": 10,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://backb.ca/",
    "claimed": true,
    "founded_year": 2019,
    "updated_at": "2024-12-12T15:24:44.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 75,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "45"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "36"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "11"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 89646,
    "name": "CloudJournee",
    "slug": "cloudjournee",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-6996fc8aac571-x2.png",
    "description": "Cloud journey is best navigated together. At CloudJournee, we don&rsquo;t just provide services &mdash;we ensure goals are met for every cloud endeavor.",
    "company_size": 10,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://www.cloudjournee.com/",
    "claimed": true,
    "founded_year": 2016,
    "updated_at": "2026-02-20T09:21:37.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 75,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "40"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "40"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 84361,
    "name": "nxtwat",
    "slug": "nxtwat",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68a6a6ee027d7-x2.png",
    "description": "NXTWAT, a top web design and development company in Bangalore with 8+ years of experience, offers responsive websites,",
    "company_size": 10,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://nxtwat.com",
    "claimed": true,
    "founded_year": 2022,
    "updated_at": "2025-08-21T07:13:46.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 75,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "30"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 13,
        "name": "Other Marketing",
        "long_name": null,
        "slug": "other-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 102,
        "name": "Desktop App Development",
        "long_name": null,
        "slug": "desktop-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 108,
        "name": "Voice Search Optimization",
        "long_name": null,
        "slug": "voice-search-optimization",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "4"
      },
      {
        "id": 111,
        "name": "Mobile Advertising",
        "long_name": null,
        "slug": "mobile-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "4"
      },
      {
        "id": 11,
        "name": "Media Planning & Buying",
        "long_name": null,
        "slug": "media-planning-buying",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 105,
        "name": "Accelerated Mobile Pages",
        "long_name": null,
        "slug": "accelerated-mobile-pages",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 114,
        "name": "Public Service Advertising",
        "long_name": null,
        "slug": "public-service-advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": true,
        "percentage": "3"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 103,
        "name": "No-Code Development",
        "long_name": null,
        "slug": "no-code-development",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "2"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 104,
        "name": "Progressive Web Apps",
        "long_name": null,
        "slug": "progressive-web-apps",
        "heading": null,
        "parent_id": 100,
        "is_new": true,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 80706,
    "name": "Clonet Technologies Private Limited",
    "slug": "clonet-technologies-private-limited",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68038c865cd50-x2.png",
    "description": "Manufacturer of Electronics weighing scale &amp; systems, Point of Sale Hardware and Software, Printer, Label Printer and POS scale, Scanner &amp; Cashdrawers",
    "company_size": 50,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://nuclonet.com/",
    "claimed": true,
    "founded_year": 2017,
    "updated_at": "2025-04-22T06:52:56.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 74,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "29"
      },
      {
        "id": 60,
        "name": "IoT Development",
        "long_name": null,
        "slug": "iot-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 45,
        "name": "CRM Consulting",
        "long_name": null,
        "slug": "crm-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 47,
        "name": "ERP Consulting",
        "long_name": null,
        "slug": "erp-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 86977,
    "name": "NVT IT Solutions",
    "slug": "nvt-it-solutions",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/86977/533247687-17955079442987286-7284092553291256404-n-691adcf164e9b.jpg",
    "description": "We are a prominent software development company based in Bangalore that specialises in a wide range of digital services.",
    "company_size": 10,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://www.nvtitsolutions.com",
    "claimed": true,
    "founded_year": 2022,
    "updated_at": "2025-11-17T08:29:37.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 74,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 102,
        "name": "Desktop App Development",
        "long_name": null,
        "slug": "desktop-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "8"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "6"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 85166,
    "name": "Versatile Club",
    "slug": "versatile-club",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-68c90fba5e825-x2.png",
    "description": "Outsourcing and Offshoring Consulting",
    "company_size": 10,
    "hourly_rate": null,
    "is_featured": false,
    "website": "https://www.versatile.club/",
    "claimed": true,
    "founded_year": 2021,
    "updated_at": "2025-09-16T08:40:13.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 74,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "20"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "20"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 87812,
    "name": "Digitide Solutions Limited",
    "slug": "digitide-solutions-limited",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-693c04a958119-x2.png",
    "description": "Digitide Solutions Limited is a global leader in AI-driven digital transformation, enabling enterprises to enhance operations and customer experiences",
    "company_size": 10,
    "hourly_rate": 250,
    "is_featured": false,
    "website": "https://www.digitide.com/",
    "claimed": true,
    "founded_year": 2024,
    "updated_at": "2025-12-12T13:12:33.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 73,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "31"
      },
      {
        "id": 72,
        "name": "Finance & Accounting Outsourcing (FAO)",
        "long_name": null,
        "slug": "finance-accounting-outsourcing-fao",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "31"
      },
      {
        "id": 62,
        "name": "Blockchain",
        "long_name": null,
        "slug": "blockchain",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "22"
      },
      {
        "id": 43,
        "name": "BI & Big Data Consulting",
        "long_name": null,
        "slug": "bi-big-data-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "15"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 68746,
    "name": "Zerozilla Technologies",
    "slug": "zerozilla-technologies",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-659cdaa90a3ee-x2.png",
    "description": "Zerozilla is your gateway to digital brilliance. We are the most valued addition your business will ever experience!",
    "company_size": 250,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://zerozilla.com/",
    "claimed": true,
    "founded_year": 2014,
    "updated_at": "2025-07-17T05:28:02.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 73,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "6"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 54,
        "name": "Custom Software Development",
        "long_name": null,
        "slug": "custom-software-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 26,
        "name": "Web Design",
        "long_name": null,
        "slug": "web-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 49,
        "name": "Cybersecurity",
        "long_name": null,
        "slug": "cybersecurity",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 52,
        "name": "IT Consulting",
        "long_name": null,
        "slug": "it-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 17,
        "name": "Content Marketing",
        "long_name": null,
        "slug": "content-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "3"
      },
      {
        "id": 19,
        "name": "Mobile & App Marketing",
        "long_name": null,
        "slug": "mobile-app-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 42,
        "name": "IT Strategy Consulting",
        "long_name": null,
        "slug": "it-strategy-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 44,
        "name": "Cloud Consulting",
        "long_name": null,
        "slug": "cloud-consulting",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 50,
        "name": "IT Managed",
        "long_name": null,
        "slug": "it-managed-services",
        "heading": "Top Companies providing <span>Managed IT</span> services:",
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 63,
        "name": "Application Testing",
        "long_name": null,
        "slug": "application-testing",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 64,
        "name": "Application Management & Support",
        "long_name": null,
        "slug": "application-management-support",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 65,
        "name": "Enterprise App Modernization",
        "long_name": null,
        "slug": "enterprise-app-modernization",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 68,
        "name": "Business Consulting",
        "long_name": null,
        "slug": "business-consulting",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "2"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 8,
        "name": "PR",
        "long_name": null,
        "slug": "pr",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 29,
        "name": "Product Design",
        "long_name": null,
        "slug": "product-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 35,
        "name": "Video Production",
        "long_name": null,
        "slug": "video-production",
        "heading": null,
        "parent_id": 96,
        "is_new": false,
        "percentage": "1"
      },
      {
        "id": 61,
        "name": "Artificial Intelligence",
        "long_name": null,
        "slug": "artificial-intelligence",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "1"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 46337,
    "name": "Mavenwit",
    "slug": "mavenwit",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/46337/269228faf16066022ee9aca31f361e85.png",
    "description": "An Award Winning Full-Time Global Advertising, Marketing & Innovational Transformation Company.",
    "company_size": 50,
    "hourly_rate": 29,
    "is_featured": false,
    "website": "https://www.mavenwit.com/",
    "claimed": true,
    "founded_year": 2020,
    "updated_at": "2024-01-25T09:36:05.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 73,
    "awards_count": {
      "year_2023": 3,
      "year_2024": 3,
      "year_2025": 0
    },
    "services": [
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "60"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 8,
        "name": "PR",
        "long_name": null,
        "slug": "pr",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 9,
        "name": "Market Research",
        "long_name": null,
        "slug": "market-research",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 11,
        "name": "Media Planning & Buying",
        "long_name": null,
        "slug": "media-planning-buying",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "4.7",
      "total": 2
    }
  },
  {
    "id": 39550,
    "name": "DINTW",
    "slug": "dintw",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/39550/1651764630200-6465de58c761c.jpg",
    "description": "Making Marketing Work",
    "company_size": 10,
    "hourly_rate": 70,
    "is_featured": false,
    "website": "https://www.dintw.com",
    "claimed": true,
    "founded_year": 2015,
    "updated_at": "2023-07-21T09:09:59.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Noida",
        "slug": "noida"
      }
    },
    "other_location": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "score": 73,
    "awards_count": {
      "year_2023": 3,
      "year_2024": 3,
      "year_2025": 0
    },
    "services": [
      {
        "id": 15,
        "name": "Digital Strategy",
        "long_name": null,
        "slug": "digital-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 10,
        "name": "Marketing Strategy",
        "long_name": null,
        "slug": "marketing-strategy",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 23,
        "name": "Pay Per Click",
        "long_name": null,
        "slug": "pay-per-click",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 58,
        "name": "E-Commerce Development",
        "long_name": null,
        "slug": "e-commerce-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "5"
      }
    ],
    "rating": {
      "avg": "5.0",
      "total": 1
    }
  },
  {
    "id": 70612,
    "name": "Vibhava Creations",
    "slug": "vibhava-creations",
    "logo": "https://rest.techbehemoths.com/storage/images/users/main/company-avatar-677e117d9b994-x2.png",
    "description": "Vibhava Creations - Your Next-Gen Creative Destination",
    "company_size": 2,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "https://vibhavacreations.com",
    "claimed": true,
    "founded_year": 2021,
    "updated_at": "2025-01-08T05:51:32.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 72,
    "awards_count": {
      "year_2023": 0,
      "year_2024": 0,
      "year_2025": 0
    },
    "services": [
      {
        "id": 24,
        "name": "Digital Marketing",
        "long_name": null,
        "slug": "digital-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 30,
        "name": "Graphic Design",
        "long_name": null,
        "slug": "graphic-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 31,
        "name": "Logo Design",
        "long_name": null,
        "slug": "logo-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "15"
      },
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "12"
      },
      {
        "id": 16,
        "name": "SMM",
        "long_name": null,
        "slug": "smm",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "10"
      },
      {
        "id": 33,
        "name": "Packaging Design",
        "long_name": null,
        "slug": "packaging-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "9"
      },
      {
        "id": 6,
        "name": "Branding",
        "long_name": null,
        "slug": "branding",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "7"
      },
      {
        "id": 5,
        "name": "Advertising",
        "long_name": null,
        "slug": "advertising",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "5"
      },
      {
        "id": 12,
        "name": "Event Marketing & Planning",
        "long_name": null,
        "slug": "event-marketing-planning",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 22,
        "name": "SEO",
        "long_name": null,
        "slug": "seo",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "4"
      },
      {
        "id": 18,
        "name": "Email Marketing",
        "long_name": null,
        "slug": "email-marketing",
        "heading": null,
        "parent_id": 97,
        "is_new": false,
        "percentage": "2"
      }
    ],
    "rating": {
      "avg": "0.0",
      "total": 0
    }
  },
  {
    "id": 46531,
    "name": "GeekyAnts",
    "slug": "geekyants",
    "logo": "https://rest.techbehemoths.com/storage/images/companies/46531/untitled-1_12.jpg",
    "description": "Web and Mobile App Development Experts",
    "company_size": 50,
    "hourly_rate": 30,
    "is_featured": false,
    "website": "http://geekyants.com/",
    "claimed": true,
    "founded_year": 2005,
    "updated_at": "2023-12-11T10:18:31.000000Z",
    "headquarter": {
      "country": {
        "name": "India",
        "slug": "india"
      },
      "city": {
        "name": "Bangalore",
        "slug": "bangalore"
      }
    },
    "other_location": {
      "country": null,
      "city": null
    },
    "score": 72,
    "awards_count": {
      "year_2023": 3,
      "year_2024": 3,
      "year_2025": 0
    },
    "services": [
      {
        "id": 55,
        "name": "Web Development",
        "long_name": null,
        "slug": "web-development",
        "heading": null,
        "parent_id": 100,
        "is_new": false,
        "percentage": "45"
      },
      {
        "id": 56,
        "name": "Mobile App Development",
        "long_name": null,
        "slug": "mobile-app-development",
        "heading": null,
        "parent_id": 99,
        "is_new": false,
        "percentage": "45"
      },
      {
        "id": 27,
        "name": "UX/UI Design",
        "long_name": null,
        "slug": "ux-ui-design",
        "heading": null,
        "parent_id": 98,
        "is_new": false,
        "percentage": "10"
      }
    ],
    "rating": {
      "avg": "4.0",
      "total": 5
    }
  }
];

async function getCoordinates(page, city, state, country = 'India', name) {
  const query = encodeURIComponent(`${name}`);
  await page.goto(`https://www.google.com/maps/search/${query}`, {
    waitUntil: 'domcontentloaded',  // ← change this from 'networkidle'
    timeout: 30000
  });
  await page.waitForFunction(() => window.location.href.includes('@'), { timeout: 10000 });

  const url = page.url();
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!match) throw new Error(`Could not parse coordinates from URL: ${url}`);

  return {
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2]),
  };
}

function formatOutput(companies) {
  const lines = companies.map((company, i) => {
    const isLast = i === companies.length - 1;
    const office = company.offices[0];
    return `  {
    name: '${company.name}',
    slug: '${company.slug}',
    website: '${company.website}',
    description: '${company.description.replace(/'/g, "\\'")}',
    industry: '${company.industry}',
    employee_count: ${company.employee_count},
    founded_year: '${company.founded_year}',
    offices: [
      { city: '${office.city}', state: '${office.state}', latitude: ${office.latitude}, longitude: ${office.longitude}, is_hq: ${office.is_hq} },
    ],
  }${isLast ? '' : ','}`;
  });

  return `[\n${lines.join('\n')}\n]`;
}

function formatInput(companies) {
  return transform(companies)
}

(async () => {
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Cache: since all companies are in Surat, fetch coords only once
  // const coordCache = {};
  const enriched = [];

  companies = formatInput(companies)

  for (const company of companies) {
    const office = company.offices[0];
    // const cacheKey = `${office.city}-${office.state}`;

    try {
      // if (!coordCache[cacheKey]) {
      console.log(`📍 Fetching coordinates for ${company.name}...`);
      let coords = await getCoordinates(page, office.city, office.state, "", company.name);
      console.log(`   ✅ Got: ${coords.latitude}, ${coords.longitude}`);
      await page.waitForTimeout(1000);
      // }


      enriched.push({
        ...company,
        offices: [{
          ...office,
          latitude: coords.latitude,
          longitude: coords.longitude,
        }],
      });

      console.log(`✅ ${company.name}`);
    } catch (err) {
      console.error(`❌ Failed for ${company.name}: ${err.message}`);
      enriched.push(company); // push without coords if failed
    }
  }

  await browser.close();

  const output = formatOutput(enriched);
  fs.writeFileSync('companieslocationdata.js', `const companies = ${output};\n\nmodule.exports = companies;\n`);
  console.log('\n🎉 Done! File saved as companies.js');
})();