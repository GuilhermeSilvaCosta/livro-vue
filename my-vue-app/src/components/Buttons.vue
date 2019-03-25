<template>
	<div>
		<a @click="callUsers" class="waves-effect waves-light btn">Call Users</a>    
		<a @click="countUsers" class="waves-effect waves-light btn">
			<i class="material-icons left">cloud</i>
			Count Users
		</a>
		<a @click="resourceGet" class="waves-effect waves-light btn">
			<i class="material-icons right">cloud</i>
			resource.get
		</a>
		<hr/>
		<pre>
			{{users | json}}
		</pre>
	</div>
</template>
<script>

import Materialize from 'materialize-css';

export default {
  data() {
		return {
			users: null,
			resourceUser: this.$resource('user{/id}')
		}		
	},
	methods: {
		callUsers: function(){
			this.$http({url: '/users.json', method: 'GET'})
			.then((response) => {
				this.users = response.data;				
			}, (response) => {
				Materialize.toast({html: 'Erro!'})
			});
		},
		countUsers: function() {
			Materialize.toast({html: this.users.length});
		},
		resourceGet: function() {
			this.resourceUser.get({id:1}).then(function(response){
				console.log(response);
			});
		}
	}
}
</script>
