<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h2>${{ rate }}/hour</h2>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  name: "Coach-Detail",
  props: ["id"],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + "" + this.selectedCoach.lastName;
    },
    contactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  created() {
    this.selectedCoach = this.$store.getters["coaches/getCoaches"].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>

<style></style>
