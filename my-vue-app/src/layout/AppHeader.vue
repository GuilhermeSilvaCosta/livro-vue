<template>
  <nav>
		<div class="nav-wrapper">
			<a href="#" class="brand-logo">Logo</a>
			<ul id="nav-mobile" class="right hide-on-med-and-down">
				<router-link tag="li" to="/"><a>Home</a></router-link>
				<router-link tag="li" to="/card"><a>Card</a></router-link>
				<router-link tag="li" to="/buttons"><a>Buttons</a></router-link>
			</ul>
		</div>
	</nav>
</template>

<script>
	export default {
		
	}
</script>
