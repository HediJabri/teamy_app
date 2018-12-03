<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="material-icons icon-lang">language</i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="lang in languages"
          :key="lang.flag"
        >
          <span
            class="dropdown-text"
            @click="changeLocale(lang.locale)"
          >
            <flag
              :iso="lang.flag"
              v-bind:squared=false
            />
            <span>{{ lang.title }}</span>
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiUsers from '@/services/ApiUsers.js'

export default {
  name: 'DropdownLanguage',
  mixins: [utilities],
  data() {
    return {
      languages: [
        { flag: 'gb', locale: 'en', title: 'English' },
        { flag: 'fr', locale: 'fr', title: 'French' }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
      this.editUserLocale()
    },
    async editUserLocale() {
      const body = { lang: this.$i18n.locale }
      try {
        await ApiUsers.patchLang(this.currentUser._id, body)
      } catch (err) {
        this.impossibleActionNotify(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-lang {
  font-size: 22px;
  margin: 3px 10px;
}
.el-dropdown-menu {
  li {
    color: $blue-grey;
    &:hover,
    &:focus {
      color: $blue-grey;
      text-decoration: none;
    }
  }
  .flag-icon {
    width: 13px;
    margin-right: 6px;
    margin-bottom: 1px;
  }
}
</style>
