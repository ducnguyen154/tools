<template>
  <div>
    <b-form-group label="Username">
      <b-form-input
        id="txt-username"
        v-model="username"
        name="username"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Password">
      <b-input-group id="ig-txt-passwd">
        <b-form-input id="txt-passwd" v-model="passwd"></b-form-input>
        <b-input-group-append>
          <b-button variant="warning" name="passwd" @click="getRandomPasswd">
            <b-icon icon="arrow-clockwise" font-scale="1"></b-icon>
            Random
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-form-group label="Hashing algorithm">
      <b-form-radio-group
        id="chk-crypt-type"
        v-model="cryptTypeSelected"
        :options="ctypeTypes"
        name="crypt-type"
        stacked
      ></b-form-radio-group>
    </b-form-group>
    <b-form-group>
      <b-button id="btn-generate" variant="info" @click="getHtpasswd">
        Generate .htpasswd
      </b-button>
      <b-link id="btn-clear" @click.prevent="toReset">Clear</b-link>
    </b-form-group>
    <!--eslint-disable-next-line vue/no-v-html-->
    <b-alert variant="info" show v-html="randomString"></b-alert>
  </div>
</template>

<script>
'use strict'
const crypto = require('crypto')
const crypt = require('apache-crypt')
const md5 = require('apache-md5')
const bcrypt = require('bcryptjs')
export default {
  data() {
    return {
      username: '',
      passwd: '',
      randomString: '',
      characterTypes: ['uppercase', 'lowercase', 'number', 'punctation'],
      cryptTypeSelected: 'md5',
      ctypeTypes: [
        { text: 'bcrypt', value: 'bcrypt' },
        { text: 'md5', value: 'md5' },
        { text: 'crypt()', value: 'crypt' },
        { text: 'SHA-1', value: 'sha1' },
      ],
    }
  },
  methods: {
    getRandomPasswd() {
      const stringLength = 16
      this.passwd = this.$randomStringGenerate(
        1,
        stringLength,
        this.characterTypes
      ).join()
    },
    getHtpasswd() {
      this.randomString = `${this.username}:${this.encrypt(
        this.passwd,
        this.cryptTypeSelected
      )}`
      // this.toReset()
    },
    verify(hash, passwd) {
      if (hash.substr(0, 5) === '{SHA}') {
        hash = hash.substr(5)
        return this.sha1(passwd) === hash
      } else if (
        hash.substr(0, 6) === '$apr1$' ||
        hash.substr(0, 3) === '$1$'
      ) {
        return md5(passwd, hash) === hash
      } else if (hash.substr(0, 4) === '$2y$' || hash.substr(0, 4) === '$2a$') {
        return bcrypt.compareSync(passwd, hash)
      } else {
        return hash === passwd || crypt(passwd, hash) === hash
      }
    },
    encrypt(passwd, type) {
      let result = ''
      if (type === 'crypt') {
        result = crypt(passwd)
      } else if (type === 'bcrypt') {
        const cost = 5
        const salt = bcrypt.genSaltSync(cost)
        result = bcrypt.hashSync(passwd, salt)
      } else if (type === 'sha1') {
        result = '{SHA}' + this.sha1(passwd)
      } else {
        result = md5(passwd)
      }

      return result
    },
    sha1(passwd) {
      const hash = crypto.createHash('sha1')
      hash.update(passwd)
      return hash.digest('base64')
    },
    toReset() {
      this.passwd = ''
      this.username = ''
    },
  },
}
</script>
