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

// const transformed = transform(companies);
// console.log(JSON.stringify(transformed, null, 2));

// // Also print as JS object literal (matching your target format)
// console.log("\n\n// --- JS Object Literal Format ---\n");
// transformed.forEach(c => {
//     console.log(`  {`);
//     console.log(`    name: '${c.name}',`);
//     console.log(`    slug: '${c.slug}',`);
//     console.log(`    website: '${c.website}',`);
//     console.log(`    description: '${c.description}',`);
//     console.log(`    industry: '${c.industry}',`);
//     console.log(`    employee_count: ${c.employee_count},`);
//     console.log(`    founded_year: '${c.founded_year}',`);
//     console.log(`    offices: [`);
//     c.offices.forEach(o => {
//         console.log(`      { city: '${o.city}', state: '${o.state}', is_hq: ${o.is_hq} },`);
//     });
//     console.log(`    ],`);
//     console.log(`  },`);
// });


module.exports = { transform }