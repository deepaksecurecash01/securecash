import Link from 'next/link';
import React from 'react';

const services = [
  "banking-collection",
  "cash-pickups-adelaide",
  "cash-collection-services",
  "armoured-car-service",
  "cash-in-transit",
  "cash-security-services",
  "bank-runs",
  "banking-services-maitland",
  "cash-in-transit-brisbane",
  "cash-collection-canberra",
  "cash-collection-service-adelaide",
  "cash-collection-cairns",
  "cash-collection-melbourne",
  "cash-collection-newcastle",
  "cash-collection",
  "cash-collection-central-coast",
  "cash-collection-adelaide",
  "cash-collection-sydney",
  "cash-collection-wollongong",
  "cash-collections-on-the-gold-coast",
  "cash-counting",
  "cash-delivery",
  "cash-in-transit-central-coast",
  "cash-in-transit-couriers",
 "cash-in-transit-services-adelaide",
  "cash-in-transit-maitland",
  "cash-in-transit-melbourne",
  "cash-in-transit-security",
  "cash-in-transit-services-brisbane",
  "cash-in-transit-adelaide",
  "cash-in-transit-services-melbourne",
  "cash-in-transit-sydney",
  "cash-in-transit-cairns",
  "cash-logistics-management",
  "cash-logistic-services",
  "cash-logistics",
  "cash-pickups",
  "cash-pickups-bendigo",
  "banking-services-melbourne",
  "cash-pickups-cairns",
  "cash-pickups-canberra",
  "cash-pickups-hobart",
  "cash-pickups-kadina",
  "cash-pickups-perth",
  "cash-pickups-toowoomba",
  "cash-pickups-warrawong",
  "cash-runs",
  "security-services-company",
  "security-guards-central-coast",
  "cash-security-services-hunter-valley",
  "cash-transport-companies",
  "cash-pickups-gold-coast",
  "cash-collection-hobart",
  "cash-collection-kadina",
  "cash-collection-service-melbourne",
  "cash-pickups-melbourne",
  "money-runs",
  "cash-in-transit-newcastle",
  "cash-in-transit-perth",
  "cash-collection-perth",
  "cash-in-transit-services-perth",
  "cash-security-services-newcastle",
  "banking-services-central-coast",
  "banking-services-newcastle",
  "cash-collection-service-canberra",
  "cash-collection-bendigo",
  "cash-collection-service-newcastle",
  "cash-in-transit-canberra",
  "cash-collection-toowoomba",
  "banking-pickups",
  "secure-cash-collection-service",
  "security-cash-services",
  "security-central-coast",
  "security-companies-melbourne",
  "security-companies",
  "security-guards-newcastle",
  "security-guards-maitland",
  "security-officers",
  "cash-pickups-sydney",
  "cash-security",
  "cash-in-transit-toowoomba",
  "cash-collection-brisbane",
  "cash-couriers",
  "cash-in-transit-services-sydney",
  "cash-pickups-brisbane",
  "cash-in-transit-warrawong",
  "cash-collection-warrawong",
  "cash-pickups-wollongong"
];

const Page = () =>
{
  return (
    <div className="bg-slate-900 w-full p-6">
      <ul className="space-y-4 text-white">
        {[...services].sort().map((slug, index) => (
          <li key={index} className="flex flex-wrap items-center gap-4">
            <span>{index + 1}. {slug}</span>
            <Link
              href={`/services/${slug}`}
              target='_blank'
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 "
            >
              Relative
            </Link>
            <a
              href={`https://www.securecash.com.au/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 "
            >
              External
            </a>
          </li>
        ))}

      </ul>
    
    </div>
  );
};

export default Page;
