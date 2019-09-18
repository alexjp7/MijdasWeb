<template>
    <div class="add-subject">
        <h1>Hi</h1>
          <!-- <v-row align="center"> -->
            <!-- <v-row justify="space-around">
                <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
                <v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch>
            </v-row> -->
            <v-form
            ref="form"
            v-model="valid"
            :lazy-validation="lazy"
            >
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

        })
    };

/**
 * subject:
 *   code, i_id, coordinator1, coordinator2
 * subject_session:
 *   subject_id, isActive, session_expiry
 */
</script>

<style scoped>
.add-subject {
    color: #333;
    background-color: white;
    margin-left: 10%;
    max-width:100%;  
    margin-right: 10%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.subject-form {
    display: flex;
    justify-content: center;
    width: 80%;
    height: 80%;
}
</style>