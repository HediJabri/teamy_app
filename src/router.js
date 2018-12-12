import Vue from 'vue'
import Router from 'vue-router'
import SmoothScroll from 'smooth-scroll'
import { utilities } from '@/mixins/utilities.js'
import Auth from '@/services/Auth.js'
import i18n from '@/plugins/i18n'
// Auth
import AuthLayout from '@/views/auth/AuthLayout'
import Register from '@/views/auth/Register'
import Login from '@/views/auth/Login'
import Contact from '@/views/auth/Contact'
// Dash
import Dash from '@/views/dash/Dash'
// Home
import Home from '@/views/dash/home/Home'
import HomeDashboard from '@/views/dash/home/HomeDashboard'
import Community from '@/views/dash/home/Community'
import TeamCreate from '@/views/dash/home/TeamCreate'
import TeamOverview from '@/views/dash/home/TeamOverview'
import UserShow from '@/views/dash/home/UserShow'
import UserEdit from '@/views/dash/home/UserEdit'
// Team
import Team from '@/views/dash/team/Team'
import TeamDashboard from '@/views/dash/team/TeamDashboard'
import TeamEdit from '@/views/dash/team/teams/TeamEdit'
import TeamShow from '@/views/dash/team/teams/TeamShow'
import TeamMemberShow from '@/views/dash/team/teams/TeamMemberShow'
import CompetitionsIndex from '@/views/dash/team/competitions/CompetitionsIndex'
import CompetitionShow from '@/views/dash/team/competitions/CompetitionShow'
import CompetitionNew from '@/views/dash/team/competitions/CompetitionNew'
import EventsIndex from '@/views/dash/team/events/EventsIndex'
import EventShow from '@/views/dash/team/events/EventShow'
import EventNew from '@/views/dash/team/events/EventNew'
import EventNewSelect from '@/views/dash/team/events/EventNewSelect'
import ReportNew from '@/views/dash/team/reports/ReportNew'
import SeasonsIndex from '@/views/dash/team/seasons/SeasonsIndex'
import StatsTeamShow from '@/views/dash/team/stats/StatsTeamShow'

Vue.use(Router)

var router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      redirect: '/login',
      meta: { requiresGuest: true },
      children: [
        {
          path: '/login/:lang?',
          name: 'login',
          component: Login
        },
        {
          path: '/contact/:lang?',
          name: 'contact',
          component: Contact
        },
        {
          path: '/register/:lang?/:teamToken?',
          name: 'register',
          component: Register
        }
      ]
    },
    {
      path: '/',
      component: Dash,
      redirect: '/home',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          redirect: '/home/dashboard',
          meta: { requiresAuth: true },
          children: [
            {
              path: '/home/dashboard',
              name: 'home-dashboard',
              component: HomeDashboard
            },
            {
              path: '/home/community',
              name: 'community',
              component: Community
            },
            {
              path: '/home/team-create',
              name: 'team-create',
              component: TeamCreate
            },
            {
              path: '/home/team/:teamId/overview',
              name: 'team-overview',
              component: TeamOverview
            },
            {
              path: '/home/user-show/:id',
              name: 'user-show',
              component: UserShow
            },
            {
              path: '/home/user-edit',
              name: 'user-edit',
              component: UserEdit
            }
          ]
        },
        {
          path: '/team',
          name: 'team',
          component: Team,
          redirect: '/:teamId/dashboard',
          meta: { requiresAuth: true },
          children: [
            {
              path: '/team/:teamId/dashboard',
              name: 'team-dashboard',
              component: TeamDashboard
            },
            {
              path: '/team/:teamId/edit',
              name: 'team-edit',
              component: TeamEdit
            },
            {
              path: '/team/:teamId/show',
              name: 'team-show',
              component: TeamShow
            },
            {
              path: '/team/:teamId/membership/:id',
              name: 'team-member-show',
              component: TeamMemberShow
            },
            {
              path: '/team/:teamId/competitions',
              name: 'competitions-index',
              component: CompetitionsIndex
            },
            {
              path: '/team/:teamId/competition/:id',
              name: 'competition-show',
              component: CompetitionShow
            },
            {
              path: '/team/:teamId/competition-new',
              name: 'competition-new',
              component: CompetitionNew
            },
            {
              path: '/team/:teamId/event-new-select',
              name: 'events-new-select',
              component: EventNewSelect
            },
            {
              path: '/team/:teamId/event-new/:type/:id?',
              name: 'events-new',
              component: EventNew
            },
            {
              path: '/team/:teamId/events',
              name: 'events-index',
              component: EventsIndex
            },
            {
              path: '/team/:teamId/event/:id',
              name: 'events-show',
              component: EventShow
            },
            {
              path: '/team/:teamId/event/:id/report-new',
              name: 'report-new',
              component: ReportNew
            },
            {
              path: '/team/:teamId/seasons',
              name: 'seasons',
              component: SeasonsIndex
            },
            {
              path: '/team/:teamId/stats',
              name: 'stats',
              component: StatsTeamShow
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach(function(to, from, next) {
  let scroll = new SmoothScroll('a[href*="#"]')
  scroll.animateScroll(0)
  const lang = to.params.lang
  if (lang) {
    utilities.methods.changeAppLocale(lang)
  }
  if (
    to.matched.some(function(record) {
      return record.meta.requiresGuest
    }) &&
    Auth.loggedIn()
  ) {
    next({
      path: '/'
    })
  } else if (
    to.matched.some(function(record) {
      return record.meta.requiresAuth
    }) &&
    !Auth.loggedIn()
  ) {
    next({
      path: `/login/${i18n.locale}`,
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
