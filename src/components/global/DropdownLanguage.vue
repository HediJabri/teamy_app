<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="material-icons icon-lang" :class="{'white': iconWhite }">language</i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :class="{'active': lang.locale === $i18n.locale}"
          v-for="lang in languages" :key="lang.flag">
          <span class="dropdown-text" @click="changeLocale(lang.locale)">
            <span>{{ $t(lang.title) }}</span>
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
  props: ['iconWhite'],
  mixins: [utilities],
  data() {
    return {
      languages: [
        { flag: 'gb', locale: 'en', title: 'english' },
        { flag: 'fr', locale: 'fr', title: 'french' }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale
      this.changeAppLocale(locale)
      if (this.currentUser) this.editUserLocale()
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
  font-size: 20px;
  margin: 5px 10px;
}
.icon-lang.white {
  color: $white-light;
}
.el-dropdown-menu {
  li {
    color: $blue-grey;
    text-transform: capitalize;
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
.el-dropdown-menu__item.active {
  background-color: #ebf6fe;
}
</style>
