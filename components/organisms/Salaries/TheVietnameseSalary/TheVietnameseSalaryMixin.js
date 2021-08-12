import { personalIncomeTax } from '@/config/personal-income-tax'
export default {
  data() {
    return {
      convertType: 'gross2net',
      salary: 0,
      allowance: 0,
      insuranceSalary: 0,
      regionList: ['I', 'II', 'III', 'IV'],
      socialInsurancePercent: 8,
      healthInsurancePercent: 1.5,
      unemploymentInsurancePercent: 1,
      socialInsurancePercentCompanyPaid: 17.5,
      healthInsurancePercentCompanyPaid: 3,
      unemploymentInsurancePercentCompanyPaid: 1,
      socialInsuranceCompanyPaid: 0,
      healthInsuranceCompanyPaid: 0,
      unemploymentInsuranceCompanyPaid: 0,
      totalCompanyPaid: 0,
      dependentPerson: 0,
      dependentPersonUnit: 4400000,
      region: 'I',
      insuranceFromSalary: true,
      baseSalary: 1490000,
      minimumWageByRegion: {
        I: 4420000,
        II: 3920000,
        III: 3430000,
        IV: 3070000
      },
      convertTypes: [
        {
          text: 'GROSS -> NET',
          value: 'gross2net'
        },
        {
          text: 'NET -> GROSS',
          value: 'net2gross'
        }
      ],
      socialInsurance: 0,
      healthInsurance: 0,
      unemploymentInsurance: 0,
      incomeBeforeTax: 0,
      reduceYourself: 11000000,
      // dependantDeduction: 0,
      taxableIncome: 0,
      pit: 0,
      grossSalary: 0,
      netSalary: 0,
      insuranceOnBaseSalary: 0,
      insuranceOnMinimumWageByRegion: 0,
      taxTable: [
        {
          label: 'Đến 5tr đồng',
          percent: 0.05,
          tax: 0
        },
        {
          label: 'Trên 5tr đồng đến 10tr đồng',
          percent: 0.1,
          tax: 0
        },
        {
          label: 'Trên 10tr đồng đến 18tr đồng',
          percent: 0.15,
          tax: 0
        },
        {
          label: 'Trên 18tr đồng đến 32tr đồng',
          percent: 0.2,
          tax: 0
        },
        {
          label: 'Trên 32tr đồng đến 52tr đồng',
          percent: 0.25,
          tax: 0
        },
        {
          label: 'Trên 52tr đồng đến 80tr đồng',
          percent: 0.3,
          tax: 0
        },
        {
          label: 'Trên 80tr đồng',
          percent: 0.35,
          tax: 0
        }
      ]
    }
  },
  computed: {
    isGross2Net() {
      return this.convertType === 'gross2net'
    },
    tongThuNhap() {
      return this.salary + this.allowance
    },
    laNguonBaoHiemKhac() {
      return this.insuranceSalary === 'khac'
    },
    dependantDeduction() {
      return this.dependentPerson * this.dependentPersonUnit
    }
  },
  watch: {
    salary(salary) {
      if (this.isGross2Net && this.insuranceFromSalary) {
        this.insuranceSalary = salary
      }
    },
    insuranceFromSalary(isTrue) {
      this.insuranceSalary = this.isGross2Net && isTrue ? this.salary : 0
    },
    convertType(type) {
      this.insuranceSalary = type === 'gross2net' ? this.salary : 0
    }
  },
  methods: {
    minimumWageByRegionDescription() {
      this.$bvModal.show('region-description')
    },
    calculateSocialInsurance(insuranceSalary) {
      this.socialInsurance =
        insuranceSalary * (this.socialInsurancePercent / 100)
    },
    calculateSocialInsuranceCompanyPaid(insuranceSalary) {
      this.socialInsuranceCompanyPaid =
        insuranceSalary * (this.socialInsurancePercentCompanyPaid / 100)
    },
    calculateHealthInsurance(insuranceSalary) {
      this.healthInsurance =
        insuranceSalary * (this.healthInsurancePercent / 100)
    },
    calculateHealthInsuranceCompanyPaid(insuranceSalary) {
      this.healthInsuranceCompanyPaid =
        insuranceSalary * (this.healthInsurancePercentCompanyPaid / 100)
    },
    calculateUnemploymentInsurance(insuranceSalary) {
      this.unemploymentInsurance =
        insuranceSalary * (this.unemploymentInsurancePercent / 100)
    },
    calculateUnemploymentInsuranceCompanyPaid(insuranceSalary) {
      this.unemploymentInsuranceCompanyPaid =
        insuranceSalary * (this.unemploymentInsurancePercentCompanyPaid / 100)
    },
    getInsuranceSalary(baseOn, salary) {
      const insuranceSalary = salary || this.insuranceSalary
      if (baseOn === 'baseSalary') {
        return Math.max(0, Math.min(insuranceSalary, 20 * this.baseSalary))
      } else {
        return Math.max(
          0,
          Math.min(insuranceSalary, 20 * this.minimumWageByRegion[this.region])
        )
      }
    },
    doConvert() {
      if (this.convertType === 'gross2net') {
        this.convertGross2Net()
      } else {
        this.convertNet2Gross()
      }
    },
    convertGross2Net() {
      this.grossSalary = this.tongThuNhap
      // tinh bao hiem
      const insuranceOnBaseSalary = this.getInsuranceSalary('baseSalary')
      this.calculateSocialInsurance(insuranceOnBaseSalary)
      this.calculateHealthInsurance(insuranceOnBaseSalary)
      this.calculateSocialInsuranceCompanyPaid(insuranceOnBaseSalary)
      this.calculateHealthInsuranceCompanyPaid(insuranceOnBaseSalary)

      const insuranceOnMinimumWageByRegion = this.getInsuranceSalary('region')
      this.calculateUnemploymentInsurance(insuranceOnMinimumWageByRegion)
      this.calculateUnemploymentInsuranceCompanyPaid(
        insuranceOnMinimumWageByRegion
      )
      // luong gross doanh nghiep phai tra
      this.totalCompanyPaid =
        this.grossSalary +
        this.socialInsuranceCompanyPaid +
        this.healthInsuranceCompanyPaid +
        this.unemploymentInsuranceCompanyPaid

      const insuranceFee =
        this.socialInsurance + this.healthInsurance + this.unemploymentInsurance
      // tinh thu nhap truoc thue
      this.incomeBeforeTax = this.grossSalary - insuranceFee

      // tinh thu nhap chiu thue
      this.taxableIncome = Math.max(
        0,
        this.incomeBeforeTax - (this.reduceYourself + this.dependantDeduction)
      )

      // tinh thue
      this.pitCalculation()

      // tinh gross
      this.netSalary = this.incomeBeforeTax - this.pit
    },
    convertNet2Gross() {
      this.netSalary = this.salary
      // tinh thu nhap chiu thue
      const reverseSalary =
        this.netSalary - (this.dependantDeduction + this.reduceYourself)

      this.taxableIncome = this.conversionTax(reverseSalary)
      this.pitCalculation()

      // tinh thu nhap truoc thue
      this.incomeBeforeTax =
        this.taxableIncome + this.dependantDeduction + this.reduceYourself

      if (!this.insuranceFromSalary) {
        const insuranceOnBaseSalary = this.getInsuranceSalary('baseSalary')
        // tinh bao hiem
        this.calculateSocialInsurance(insuranceOnBaseSalary)
        this.calculateHealthInsurance(insuranceOnBaseSalary)
        this.calculateSocialInsuranceCompanyPaid(insuranceOnBaseSalary)
        this.calculateHealthInsuranceCompanyPaid(insuranceOnBaseSalary)

        const insuranceOnMinimumWageByRegion = this.getInsuranceSalary('region')
        this.calculateUnemploymentInsurance(insuranceOnMinimumWageByRegion)
        this.calculateUnemploymentInsuranceCompanyPaid(
          insuranceOnMinimumWageByRegion
        )

        this.grossSalary =
          this.incomeBeforeTax +
          this.socialInsurance +
          this.healthInsurance +
          this.unemploymentInsurance
      } else {
        // tinh tien bao hiem
        const tempGrossSalary = this.incomeBeforeTax / 0.895

        const insuranceOnBaseSalary = this.getInsuranceSalary(
          'baseSalary',
          tempGrossSalary
        )

        // tinh bao hiem
        this.calculateSocialInsurance(insuranceOnBaseSalary)
        this.calculateHealthInsurance(insuranceOnBaseSalary)
        this.calculateSocialInsuranceCompanyPaid(insuranceOnBaseSalary)
        this.calculateHealthInsuranceCompanyPaid(insuranceOnBaseSalary)

        this.grossSalary =
          (this.incomeBeforeTax + this.socialInsurance + this.healthInsurance) /
          0.99

        const insuranceOnMinimumWageByRegion = this.getInsuranceSalary(
          'region',
          this.grossSalary
        )

        // tinh bao hiem that nghiep
        this.calculateUnemploymentInsurance(insuranceOnMinimumWageByRegion)
        this.calculateUnemploymentInsuranceCompanyPaid(
          insuranceOnMinimumWageByRegion
        )
      }
      // tinh luong gross ma cty phai tra
      this.totalCompanyPaid =
        this.grossSalary +
        this.socialInsuranceCompanyPaid +
        this.healthInsuranceCompanyPaid +
        this.unemploymentInsuranceCompanyPaid
    },
    pitCalculation() {
      this.taxTable = this.breakdownPIT(this.taxableIncome)
      this.pit = this.taxTable.reduce((accumulator, _item) => {
        return accumulator + _item.tax
      }, 0)
    },
    conversionTax(netSalary) {
      const conversionTaxTable = personalIncomeTax.conversionTax.find(
        (item) =>
          netSalary >= item.min && (item.max === -1 || netSalary <= item.max)
      )

      return (
        (netSalary - conversionTaxTable?.excluded) / conversionTaxTable?.percent
      )
    },
    breakdownPIT(taxableIncome) {
      const breakedDown = this.taxTable.reduce((accumulator, item) => {
        let range = 0
        const taxConfig = personalIncomeTax.taxTable.find(
          (i) => item.percent === i.percent
        )
        if (taxConfig?.max !== -1 && taxableIncome > taxConfig?.max) {
          range = taxConfig.max - taxConfig.min + 1
        } else if (taxableIncome > taxConfig.min) {
          range = taxableIncome - taxConfig.min + 1
        }

        item.tax = range * item.percent
        accumulator.push(item)

        return accumulator
      }, [])

      return breakedDown
    }
  }
}
