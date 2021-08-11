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
            :label="isGross2Net ? 'Lương chính thức' : 'Lương NET'"
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
                readonly
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
                readonly
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
                readonly
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
            label-cols-sm="2"
            label-size="sm"
            label-for="region"
          >
            <template #label class="flex">
              <span>Vùng</span>
              <b-icon
                icon="question-octagon-fill"
                variant="primary"
                @click="minimumWageByRegionDescription"
              ></b-icon>
            </template>
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
                readonly
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
            <b-input-group size="sm" append="người">
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
          <b-th>{{ grossSalary | numberFormat }} VNĐ</b-th>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm xã hội ({{ socialInsurancePercent }}%)</b-td>
          <b-td>{{ socialInsurance | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm y tế ({{ healthInsurancePercent }}%)</b-td>
          <b-td>{{ healthInsurance | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td
            >Bảo hiểm thất nghiệp ({{ unemploymentInsurancePercent }}% - lương
            tối thiểu vùng)</b-td
          >
          <b-td>{{ unemploymentInsurance | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-th>Thu nhập trước thuế</b-th>
          <b-th>{{ incomeBeforeTax | numberFormat }} VNĐ</b-th>
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
          <b-th>{{ taxableIncome | numberFormat }} VNĐ</b-th>
        </b-tr>
        <b-tr>
          <b-td>Thuế thu nhập cá nhân (PIT)</b-td>
          <b-td>{{ pit | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-th>Lương NET</b-th>
          <b-th>{{ netSalary | numberFormat }} VNĐ</b-th>
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
    <h4 class="mt-5">Doanh nghiệp chi trả</h4>
    <b-table-simple small responsive bordered hover class="company-paid-table">
      <b-tbody>
        <b-tr>
          <b-th>Lương GROSS</b-th>
          <b-th>{{ grossSalary | numberFormat }} VNĐ</b-th>
        </b-tr>
        <b-tr>
          <b-td
            >Bảo hiểm xã hội ({{ socialInsurancePercentCompanyPaid }}%)</b-td
          >
          <b-td>{{ socialInsuranceCompanyPaid | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td>Bảo hiểm y tế ({{ healthInsurancePercentCompanyPaid }}%)</b-td>
          <b-td>{{ healthInsuranceCompanyPaid | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-td
            >Bảo hiểm thất nghiệp ({{
              unemploymentInsurancePercentCompanyPaid
            }}% - Lương tối thiểu vùng)</b-td
          >
          <b-td>{{ unemploymentInsuranceCompanyPaid | numberFormat }} VNĐ</b-td>
        </b-tr>
        <b-tr>
          <b-th>Tổng cộng</b-th>
          <b-th>{{ totalCompanyPaid | numberFormat }} VNĐ</b-th>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-modal
      id="region-description"
      title="Quy định lương tối thiểu vùng"
      centered
      scrollable
      hide-footer
    >
      <p>
        (Tham khảo:
        <a
          href="https://thuvienphapluat.vn/van-ban/Lao-dong-Tien-luong/Nghi-dinh-90-2019-ND-CP-muc-luong-toi-thieu-vung-418807.aspx"
          >Nghị định 90/2019/NĐ-CP</a
        >)
      </p>
      <h5>Lương tối thiểu vùng:</h5>
      <ul>
        <li>Vùng I: 4.420.000 đồng/tháng</li>
        <li>Vùng II: 3.920.000 đồng/tháng</li>
        <li>Vùng III: 3.430.000 đồng/tháng</li>
        <li>Vùng IV: 3.070.000 đồng/tháng</li>
      </ul>
      <h5 class="sm">Danh sách vùng:</h5>
      <p>
        <strong>1. Vùng I, gồm các địa bàn:</strong>- Các quận và các huyện Gia
        Lâm, Đông Anh, Sóc Sơn, Thanh Trì, Thường Tín, Hoài Đức, Thạch Thất,
        Quốc Oai, Thanh Oai, Mê Linh, Chương Mỹ và thị xã Sơn Tây thuộc thành
        phố Hà Nội; - Các quận và các huyện Thủy Nguyên, An Dương, An Lão, Vĩnh
        Bảo, Tiên Lãng, Cát Hải, Kiến Thụy thuộc thành phố Hải Phòng; - Các quận
        và các huyện Củ Chi, Hóc Môn, Bình Chánh, Nhà Bè thuộc thành phố Hồ Chí
        Minh; - Thành phố Biên Hòa, thị xã Long Khánh và các huyện Nhơn Trạch,
        Long Thành, Vĩnh Cửu, Trảng Bom thuộc tỉnh Đồng Nai; - Thành phố Thủ Dầu
        Một, các thị xã Thuận An, Dĩ An, Bến Cát, Tân Uyên và các huyện Bàu
        Bàng, Bắc Tân Uyên, Dầu Tiếng, Phú Giáo thuộc tỉnh Bình Dương; - Thành
        phố Vũng Tàu, thị xã Phú Mỹ thuộc tỉnh Bà Rịa - Vũng Tàu.
      </p>
      <p>
        <strong>2. Vùng II, gồm các địa bàn:</strong>
        - Các huyện còn lại thuộc thành phố Hà Nội; - Các huyện còn lại thuộc
        thành phố Hải Phòng; - Thành phố Hải Dương thuộc tỉnh Hải Dương; - Thành
        phố Hưng Yên, thị xã Mỹ Hào và các huyện Văn Lâm, Văn Giang, Yên Mỹ
        thuộc tỉnh Hưng Yên; - Các thành phố Vĩnh Yên, Phúc Yên và các huyện
        Bình Xuyên, Yên Lạc thuộc tỉnh Vĩnh Phúc; - Thành phố Bắc Ninh, thị xã
        Từ Sơn và các huyện Quế Võ, Tiên Du, Yên Phong, Thuận Thành, Gia Bình,
        Lương Tài thuộc tỉnh Bắc Ninh; - Các thành phố Hạ Long, Cẩm Phả, Uông
        Bí, Móng Cái thuộc tỉnh Quảng Ninh; - Các thành phố Thái Nguyên, Sông
        Công và thị xã Phổ Yên thuộc tỉnh Thái Nguyên; - Thành phố Việt Trì
        thuộc tỉnh Phú Thọ; - Thành phố Lào Cai thuộc tỉnh Lào Cai; - Thành phố
        Nam Định và huyện Mỹ Lộc thuộc tỉnh Nam Định; - Thành phố Ninh Bình
        thuộc tỉnh Ninh Bình; - Thành phố Huế thuộc tỉnh Thừa Thiên Huế; - Các
        thành phố Hội An, Tam Kỳ thuộc tỉnh Quảng Nam; - Các quận, huyện thuộc
        thành phố Đà Nẵng; - Các thành phố Nha Trang, Cam Ranh thuộc tỉnh Khánh
        Hòa; - Các thành phố Đà Lạt, Bảo Lộc thuộc tỉnh Lâm Đồng; - Thành phố
        Phan Thiết thuộc tỉnh Bình Thuận; - Huyện Cần Giờ thuộc Thành phố Hồ Chí
        Minh; - Thành phố Tây Ninh và các huyện Trảng Bàng, Gò Dầu thuộc tỉnh
        Tây Ninh; - Các huyện Định Quán, Xuân Lộc, Thống Nhất thuộc tỉnh Đồng
        Nai; - Thành phố Đồng Xoài và các huyện Chơn Thành, Đồng Phú thuộc tỉnh
        Bình Phước; - Thành phố Bà Rịa thuộc tỉnh Bà Rịa - Vũng Tàu; - Thành phố
        Tân An và các huyện Đức Hòa, Bến Lức, Thủ Thừa, Cần Đước, Cần Giuộc
        thuộc tỉnh Long An; - Thành phố Mỹ Tho và huyện Châu Thành thuộc tỉnh
        Tiền Giang; - Thành phố Bến Tre và huyện Châu Thành thuộc tỉnh Bến Tre;
        - Các quận thuộc thành phố Cần Thơ; - Các thành phố Rạch Giá, Hà Tiên và
        huyện Phú Quốc thuộc tỉnh Kiên Giang; - Các thành phố Long Xuyên, Châu
        Đốc thuộc tỉnh An Giang; - Thành phố Trà Vinh thuộc tỉnh Trà Vinh; -
        Thành phố Cà Mau thuộc tỉnh Cà Mau; - Thành phố Đồng Hới thuộc tỉnh
        Quảng Bình.
      </p>
      <p>
        <strong>3. Vùng III, gồm các địa bàn:</strong>
        - Các thành phố trực thuộc tỉnh còn lại (trừ các thành phố trực thuộc
        tỉnh nêu tại vùng I, vùng II); - Các huyện Cẩm Giàng, Nam Sách, Kim
        Thành, Kinh Môn, Gia Lộc, Bình Giang, Tứ Kỳ thuộc tỉnh Hải Dương; - Các
        huyện Vĩnh Tường, Tam Đảo, Tam Dương, Lập Thạch, Sông Lô thuộc tỉnh Vĩnh
        Phúc; - Thị xã Phú Thọ và các huyện Phù Ninh, Lâm Thao, Thanh Ba, Tam
        Nông thuộc tỉnh Phú Thọ; - Các huyện Việt Yên, Yên Dũng, Hiệp Hòa, Tân
        Yên, Lạng Giang thuộc tỉnh Bắc Giang; - Các thị xã Quảng Yên, Đông Triều
        và huyện Hoành Bồ thuộc tỉnh Quảng Ninh; - Các huyện Bảo Thắng, Sa Pa
        thuộc tỉnh Lào Cai; - Các huyện còn lại thuộc tỉnh Hưng Yên; - Các huyện
        Phú Bình, Phú Lương, Đồng Hỷ, Đại Từ thuộc tỉnh Thái Nguyên; - Huyện
        Lương Sơn thuộc tỉnh Hòa Bình; - Các huyện còn lại thuộc tỉnh Nam Định;
        - Các huyện Duy Tiên, Kim Bảng thuộc tỉnh Hà Nam; - Thị xã Cửa Lò và các
        huyện Nghi Lộc, Hưng Nguyên thuộc tỉnh Nghệ An; - Các huyện Gia Viễn,
        Yên Khánh, Hoa Lư thuộc tỉnh Ninh Bình; - Thị xã Bỉm Sơn và các huyện
        Tĩnh Gia, Đông Sơn, Quảng Xương thuộc tỉnh Thanh Hóa; - Thị xã Kỳ Anh
        thuộc tỉnh Hà Tĩnh; - Các thị xã Hương Thủy, Hương Trà và các huyện Phú
        Lộc, Phong Điền, Quảng Điền, Phú Vang thuộc tỉnh Thừa Thiên Huế; - Thị
        xã Điện Bàn và các huyện Đại Lộc, Duy Xuyên, Núi Thành, Quế Sơn, Thăng
        Bình, Phú Ninh thuộc tỉnh Quảng Nam; - Các huyện Bình Sơn, Sơn Tịnh
        thuộc tỉnh Quảng Ngãi; - Thị xã Sông Cầu và huyện Đông Hòa thuộc tỉnh
        Phú Yên; - Các huyện Ninh Hải, Thuận Bắc thuộc tỉnh Ninh Thuận; - Thị xã
        Ninh Hòa và các huyện Cam Lâm, Diên Khánh, Vạn Ninh thuộc tỉnh Khánh
        Hòa; - Huyện Đắk Hà thuộc tỉnh Kon Tum; - Các huyện Đức Trọng, Di Linh
        thuộc tỉnh Lâm Đồng; - Thị xã La Gi và các huyện Hàm Thuận Bắc, Hàm
        Thuận Nam thuộc tỉnh Bình Thuận; - Các thị xã Phước Long, Bình Long và
        các huyện Hớn Quản, Lộc Ninh, Phú Riềng thuộc tỉnh Bình Phước; - Các
        huyện còn lại thuộc tỉnh Tây Ninh; - Các huyện còn lại thuộc tỉnh Đồng
        Nai; - Các huyện Long Điền, Đất Đỏ, Xuyên Mộc, Châu Đức, Côn Đảo thuộc
        tỉnh Bà Rịa - Vũng Tàu; - Thị xã Kiến Tường và các huyện Đức Huệ, Châu
        Thành, Tân Trụ, Thạnh Hóa thuộc tỉnh Long An; - Các thị xã Gò Công, Cai
        Lậy và các huyện Chợ Gạo, Tân Phước thuộc tỉnh Tiền Giang; - Các huyện
        Ba Tri, Bình Đại, Mỏ Cày Nam thuộc tỉnh Bến Tre; - Thị xã Bình Minh và
        huyện Long Hồ thuộc tỉnh Vĩnh Long; - Các huyện thuộc thành phố Cần Thơ;
        - Các huyện Kiên Lương, Kiên Hải, Châu Thành thuộc tỉnh Kiên Giang; -
        Thị xã Tân Châu và các huyện Châu Phú, Châu Thành, Thoại Sơn thuộc tỉnh
        An Giang; - Thị xã Ngã Bảy và các huyện Châu Thành, Châu Thành A thuộc
        tỉnh Hậu Giang; - Thị xã Duyên Hải thuộc tỉnh Trà Vinh; - Thị xã Giá Rai
        thuộc tỉnh Bạc Liêu; - Các thị xã Vĩnh Châu, Ngã Năm thuộc tỉnh Sóc
        Trăng; - Các huyện Năm Căn, Cái Nước, U Minh, Trần Văn Thời thuộc tỉnh
        Cà Mau; - Các huyện Lệ Thủy, Quảng Ninh, Bố Trạch, Quảng Trạch và thị xã
        Ba Đồn thuộc tỉnh Quảng Bình.
      </p>
      <p><strong>4. Vùng IV:</strong> gồm các địa bàn còn lại./.</p>
    </b-modal>
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
.company-paid-table {
  td {
    text-align: right;
  }

  th {
    text-align: right;
  }
}
::v-deep #region-description {
  font-size: 10pt;
}
</style>
