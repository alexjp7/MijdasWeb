<template>
    <div class="add-subject-content">
        <h1>Create Subject</h1>
          <!-- <v-row align="center"> -->
            <!-- <v-row justify="space-around">
                <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
                <v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch>
            </v-row> -->
            <v-form
            class="subject-form"
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            >
                <!-- <template> -->
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" sm="6">
        <v-subheader v-text="'Multiple with persistent hint'"></v-subheader>
        <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
        ></v-checkbox>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
            v-if="!checkbox"
            v-model="e6"
            :items="test"
            :menu-props="{ maxHeight: '400' }"
            label="Select"
            hint="Select an existing subject, or create a new one."
            persistent-hint
        ></v-select>
        <v-text-field
            v-if="checkbox"
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-subheader v-text="'Multiple (Chips) with persistent hint'"></v-subheader>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="e7"
          :items="states"
          label="Select"
          multiple
          chips
          hint="What are the target regions"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
<!-- </template> -->

                <v-text-field
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                ></v-text-field>

                <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
                ></v-select>

                <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
                ></v-checkbox>

                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
                >
                    Validate
                </v-btn>

                <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
                >
                    Reset Form
                </v-btn>

                <v-btn
                    color="warning"
                    @click="resetValidation"
                >
                    Reset Validation
                </v-btn>
            </v-form>
        <!-- </v-row> -->
    </div>
</template>

<script>
    import Subject from "@/services/Subject";
    export default {
        name: "AddSubject",
        data: () => ({
            /**
             * v-form data
             */
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],
            checkbox: false,
            lazy: false,
            /**
             * v-select data
             */
            e6: [],
            e7: [],
            states: [
                'Alabama', 'Alaska', 'American Samoa', 'Arizona',
                'Arkansas', 'California', 'Colorado', 'Connecticut',
                'Delaware', 'District of Columbia', 'Federated States of Micronesia',
                'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
                'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
                'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
                'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
                'Missouri', 'Montana', 'Nebraska', 'Nevada',
                'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
                'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
                'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
                'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
                'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
                'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
            ],
            test: [
                // {
                //     text: 'text',
                //     value: 'value',
                //     header: 'header'
                // },
                // {
                //     text: 'text_one',
                //     value: 'value_one',
                //     divider: 'p'
                // }
            ],
            // username: null,
            username: 'aa111',
            institutions: null
        }),
        methods: {
            /**
             * v-form methods
             */
            validate () {
                if (this.$refs.form.validate()) {
                this.snackbar = true
                }
            },
            reset () {
                this.$refs.form.reset()
            },
            resetValidation () {
                this.$refs.form.resetValidation()
            },
            /**
             * v-select methods
             */
        },
        async mounted() {
            // console.log("mounted() method");
            // this.test = ['one', 'two', 'three'];
            // this.username = this.$store.state.user;
            var response = await Subject.subjects({
                request: 'VIEW_OWNED_SUBJECTS',
                username: this.username
            }).then(response => {
                this.institutions = response.data;
                console.log("Response data:");
                console.log(this.institutions);
                console.log(response);
                console.log(this.username);
                this.institutions.forEach( item => {
                    this.test.push({
                        header: item.institution
                    });
                    item.subjects.forEach( subject => {
                        this.test.push({
                            text: subject.subject_code,
                            value: subject.id
                        })
                    });
                });
            }).catch(error => {
                console.log("There was an error:");
                console.log(error);
            }).finally();
        }
    };

/**
 * subject:
 *   code, i_id, coordinator1, coordinator2
 * subject_session:
 *   subject_id, isActive, session_expiry
 */
</script>

<style scoped>
.add-subject-content {
    color: #333;
    background-color: white;
    margin-left: 10%;
    padding: 20px 50px;
    max-width:100%;  
    margin-right: 10%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.subject-form {
    /* display: flex;
    justify-content: center;
    flex-direction: column;
    width: 80%;
    height: 80%;
    max-width: 800px; */
}
</style>