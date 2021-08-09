<template>
  <div class="mt-3">
    <b-form>
      <h4>Chuyển đổi</h4>
      <b-form-group label-size="sm">
        <b-form-radio-group
          v-model="convertType"
          :options="convertTypes"
          size="sm"
          name="convert-type"
        ></b-form-radio-group>
      </b-form-group>
      <h4>Thu nhập</h4>
      <b-row>
        <b-col sm="6">
          <b-form-group
            label-cols-sm="4"
            label="Lương chính thức"
            label-for="salary"
            label-size="sm"
          >
            <b-input-group append="VNĐ" size="sm">
              <b-form-input
                id="salary"
                v-model.number="salary"
                type="number"
                size="sm"
                class="text-right"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label-cols-sm="4"
            label="Thưởng + Phụ cấp"
            label-for="allowance"
            label-size="sm"
          >
            <b-input-group append="VNĐ" size="sm">
              <b-form-input
                v-if="isGross2Net"
                id="allowance"
                v-model.number="allowance"
                type="number"
                size="sm"
                class="text-right"
              ></b-form-input>
              <b-form-input
                v-else
                id="allowance"
                type="number"
                size="sm"
                class="text-right"
                disabled
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <h4>Bảo hiểm</h4>
      <b-row>
        <b-col sm="8">
          <b-form-group
            label="Lương đóng bảo hiểm"
            label-cols-sm="5"
            label-size="sm"
            class="flex"
          >
            <b-input-group size="sm" append="VNĐ">
              <b-form-input
                v-model.number="insuranceSalary"
                :disabled="insuranceFromSalary"
                size="sm"
                type="number"
                class="text-right"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-checkbox
            v-model="insuranceFromSalary"
            name="insuranceSource"
            size="sm"
            >Từ lương chính thức</b-form-checkbox
          >
        </b-col>
        <b-col sm="4">
          <b-form-group
            label="BHXN"
            label-size="sm"
            label-cols-sm="3"
            label-for="bao-hiem-xa-hoi"
          >
            <b-input-group size="sm" append="%">
              <b-form-input
                id="bao-hiem-xa-hoi"
                v-model.number="socialInsurancePercent"
                size="sm"
                type="number"
                class="text-right"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group
            label="BHYT"
            label-cols-sm="3"
            label-size="sm"
            label-for="hao-hiem-y-te"
          >
            <b-input-group size="sm" append="%">
              <b-form-input
                id="bao-hiem-y-te"
                v-model.number="healthInsurancePercent"
                size="sm"
                type="number"
                class="text-right"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="4">
          <b-form-group
            label="BHTN"
            label-cols-sm="3"
            label-size="sm"
            label-for="bao-hiem-that-nghiep"
          >
            <b-input-group size="sm" append="%">
              <b-form-input
                id="bao-hiem-that-nghiep"
                v-model.number="unemploymentInsurancePercent"
                size="sm"
                type="number"
                class="text-right"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col class="mb-4">
          <b-form-group
            label="Vùng"
            label-cols-sm="1"
            label-size="sm"
            label-for="region"
          >
            <b-form-radio-group
              id="region"
              v-model="region"
              :options="regionList"
              size="sm"
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <h4>Các khoản giảm trừ</h4>
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="Giảm trừ bản thân"
            label-cols-sm="4"
            label-size="sm"
            label-for="khau-tru-ban-than"
          >
            <b-input-group size="sm" append="VNĐ">
              <b-form-input
                id="khau-tru-ban-than"
                v-model.number="reduceYourself"
                size="sm"
                type="number"
                class="text-right"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Người phụ thuộc"
            label-cols-sm="4"
            label-size="sm"
            label-for="nguoi-phu-thuoc"
          >
            <b-input-group size="sm" append="VNĐ">
              <b-form-input
                id="nguoi-phu-thuoc"
                v-model.number="dependentPerson"
                number
                size="sm"
                type="number"
                class="text-right"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button variant="warning" @click="doConvert">Chuyển đổi</b-button>
    </b-form>
    <h4 class="mt-5">Kết quả chi tiết</h4>
    <b-table-simple small responsive bordered hover class="nettable">
      <b-tbody>
        <b-tr>
          <b-th>Lương GROSS</b-th>
          <b-td>{{ grossSalary | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm xã hội (8%)</b-td>
          <b-td>{{ socialInsurance | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm y tế (1.5%)</b-td>
          <b-td>{{ healthInsurance | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm thất nghiệp (1% - lương tối thiểu vùng)</b-td>
          <b-td>{{ unemploymentInsurance | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-th>Thu nhập trước thuế</b-th>
          <b-td>{{ incomeBeforeTax | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td>Giảm trừ bản thân</b-td>
          <b-td>{{ reduceYourself | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td>Giảm trừ gia cảnh - người phụ thuộc</b-td>
          <b-td>{{ dependantDeduction | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-th>Thu nhập tính thuế</b-th>
          <b-td>{{ taxableIncome | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td>Thuế thu nhập cá nhân (PIT)</b-td>
          <b-td>{{ pit | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-th>Lương NET</b-th>
          <b-td>{{ netSalary | numberFormat }} VNĐ</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <h4 class="mt-5">Diễn giải thuế thu nhập cá nhân</h4>
    <b-table-simple small responsive bordered hover>
      <b-thead>
        <b-tr>
          <b-th>Thu nhập tính thuế/tháng</b-th>
          <b-th class="text-right">Thuế suất</b-th>
          <b-th class="text-right">Tiền thuế (VNĐ)</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(tax, index) in taxTable" :key="index">
          <b-td>{{ tax.label }}</b-td>
          <b-td class="text-right">{{ tax.percent * 100 }}%</b-td>
          <b-td class="text-right">{{ tax.tax | numberFormat }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <!-- <h4 class="mt-5">Diễn giải chi trả của Doanh nghiệp</h4>
    <b-table-simple small responsive bordered hover>
      <b-tbody>
        <b-tr>
          <b-td>Lương GROSS</b-td>
          <b-td></b-td>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm xã hội (17.5%)</b-td>
          <b-td></b-td>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm y tế (3%)</b-td>
          <b-td></b-td>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm thất nghiệp (1% - Lương tối thiểu vùng)</b-td>
          <b-td></b-td>
        </b-tr>
        <b-tr>
          <b-th>Tổng cộng</b-th>
          <b-td></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple> -->
  </div>
</template>

<script>
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
    calculateSocialInsurance(insuranceSalary) {
      this.socialInsurance =
        insuranceSalary * (this.socialInsurancePercent / 100)
    },
    calculateHealthInsurance(insuranceSalary) {
      this.healthInsurance =
        insuranceSalary * (this.healthInsurancePercent / 100)
    },
    calculateUnemploymentInsurance(insuranceSalary) {
      this.unemploymentInsurance =
        insuranceSalary * (this.unemploymentInsurancePercent / 100)
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

      const insuranceOnMinimumWageByRegion = this.getInsuranceSalary('region')
      this.calculateUnemploymentInsurance(insuranceOnMinimumWageByRegion)

      const insuranceFee =
        this.socialInsurance + this.healthInsurance + this.unemploymentInsurance
      // tinh thu nhap truoc thue
      this.incomeBeforeTax = this.grossSalary - insuranceFee

      // tinh thu nhap chiu thue
      this.taxableIncome =
        this.incomeBeforeTax - (this.reduceYourself + this.dependantDeduction)

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

        const insuranceOnMinimumWageByRegion = this.getInsuranceSalary('region')
        this.calculateUnemploymentInsurance(insuranceOnMinimumWageByRegion)

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

        this.grossSalary =
          (this.incomeBeforeTax + this.socialInsurance + this.healthInsurance) /
          0.99

        const insuranceOnMinimumWageByRegion = this.getInsuranceSalary(
          'region',
          this.grossSalary
        )

        // tinh bao hiem that nghiep
        this.calculateUnemploymentInsurance(insuranceOnMinimumWageByRegion)
      }
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
</script>

<style lang="scss" scoped>
.nettable {
  td {
    text-align: right;
  }

  th {
    text-align: right;
  }
}
</style>
