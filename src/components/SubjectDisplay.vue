<style scoped>
.subjectDisplay {
	color:black;
	background-color:white;
	margin: auto;
	padding: 5%;
	text-align: center;
}
.cards {
	color:black;
	background-color:white;
	margin: auto;
	padding: 2%;
	text-align: left !important;
}
.subjects
{
	color:white !important;
	padding:30%;
}
</style>
<template>
<div class ="subjectDisplay">
		<h1>Subjects</h1>
		<div class ="cards" v-for="institution in institutions" v-bind:key="institution.id" id="populate_subjects">
		<v-card>
				<h1>{{institution.institution}}</h1>
				<div v-for="subject in institution.subjects"  v-bind:key="subject.id">
				<!-- Children nodes with clickable space -->
				<v-card-actions >
					<v-btn  x-large class="subjects" block color="secondary" light>{{subject.subject_code}}</v-btn>
				</v-card-actions>
				</div>
		
		</v-card>
	</div>

</div>
</template>

<script>

export default {
	name: "SubjectDisplay",
	data:() => ({

		institutions:[]
	}),

	methods:{	
	},

	created() {
		this.$http.post("https://markit.mijdas.com/api/subject/",{
			"request":"POPULATE_SUBJECTS",
			"username":"st111"

		}).then(function(data){
			//console.log(Object.entries(data.body));
			
			this.institutions = Object.values(data.body);
		});
	}
};
</script>

