/*
  Authors: Sam, Alex
*/

//Base Vue Import
import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

//Components
import SubjectDisplay from "@/components/SubjectDisplay";
import Navigation from "@/components/Navigation";

import { Store } from "vuex";
import store from "./store";
// import store from "./store";

/**
 * Create the routes for the views
 * Note that these maybe nested to serve possible purpose
 * meta: {x} can be used for certain properties and privileges
 **/

Vue.use(Router);

const router = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    /**************
     * VIEWS
     **************/
    {
      path: "*",
      redirect: "/" //Redirects Home if link is not recognised
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./views/Dashboard.vue")

      // async beforeRouteLeave(to, from, next) {
      //   try {
      //     var hasPermission = await Store.state("isUserLoggedIn");
      //     console.log("hello");
      //     if (hasPermission) {
      //       next();
      //     }
      //   } catch (e) {
      //     next({
      //       name: "home",
      //       query: { redirectFrom: to.fullPath }
      //     });
      //   }
      // }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      meta: {
        guest: true
      }
    },
    {
      path: "/announcements",
      name: "announcements",
      component: () => import("./views/Announcements.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/assessment",
      name: "assessment",
      component: () => import("./views/Assessment.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("./views/Calendar.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/criteria",
      name: "criteria",
      component: () => import("./views/Criteria.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/jobboard",
      name: "jobboard",
      component: () => import("./views/JobBoard.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
      meta: {
        guest: true
      }
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("./views/Settings.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/students",
      name: "students",
      component: () => import("./views/Students.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/teachingstaff",
      name: "teachingstaffs",
      component: () => import("./views/TeachingStaff.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/add-subject",
      name: "AddSuject",
      component: () => import("./views/AddSubject.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/results",
      name: "Results",
      component: () => import("./views/Results.vue"),
      meta: {
        requiresAuth: true
      }
    },

    /**************
     * COMPONENTS
     **************/

    {
      path: "/navigation",
      name: "navigation",
      component: Navigation
    },
    {
      path: "/subjectDisplay",
      name: "subjectDisplay",
      component: SubjectDisplay,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/assessments",
      name: "assessments",
      component: () => import("./components/Assessments.vue")
    },
    {
      path: "/Admin",
      name: "Admin",
      component: () => import("./views/Admin.vue"),
      meta: {
        requiresAuth: true,
        is_admin: true
      } /*
      async beforeEnter(to, from, next) {
        try {
          var hasPermission = await Store.state("isUserLoggedIn");
          if (hasPermission) {
            next();
          }
        } catch (e) {
          next({
            name: "login",
            query: { redirectFrom: to.fullPath }
          });
        }
      }
      */
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register", "/"];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !store.state.isUserLoggedIn) {
    return next("/login");
  }

  next();
});

export default router;
