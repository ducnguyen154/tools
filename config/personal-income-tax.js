export const personalIncomeTax = {
  taxTable: [
    {
      min: 1,
      max: 5000000,
      percent: 0.05,
      excluded: 0
    },
    {
      min: 5000001,
      max: 10000000,
      percent: 0.1,
      excluded: 250000
    },
    {
      min: 10000001,
      max: 18000000,
      percent: 0.15,
      excluded: 750000
    },
    {
      min: 18000001,
      max: 32000000,
      percent: 0.2,
      excluded: 1650000
    },
    {
      min: 32000001,
      max: 52000000,
      percent: 0.25,
      excluded: 3250000
    },
    {
      min: 52000001,
      max: 80000000,
      percent: 0.3,
      excluded: 5850000
    },
    {
      min: 80000001,
      max: -1,
      percent: 0.35,
      excluded: 9850000
    }
  ],
  conversionTax: [
    {
      min: 0,
      max: 4750000,
      percent: 0.95,
      excluded: 0
    },
    {
      min: 4750001,
      max: 9250000,
      percent: 0.9,
      excluded: 250000
    },
    {
      min: 9250001,
      max: 16050000,
      percent: 0.85,
      excluded: 750000
    },
    {
      min: 16050001,
      max: 27250000,
      percent: 0.8,
      excluded: 1650000
    },
    {
      min: 27250001,
      max: 42250000,
      percent: 0.75,
      excluded: 3250000
    },
    {
      min: 42250001,
      max: 61850000,
      percent: 0.7,
      excluded: 5850000
    },
    {
      min: 61850000,
      max: -1,
      percent: 0.65,
      excluded: 9850000
    }
  ]
}
