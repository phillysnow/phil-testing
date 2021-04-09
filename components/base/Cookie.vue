<template>
	<div class="nocontent">
		<transition>
			<div
				v-if="displayBanner"
				class="cookie-bar"
				role="dialog"
				aria-label="Cookiemelding"
				:hidden="!displayBanner"
			>
				<article class="cookie-bar-content">
					<h2>Cookiemelding</h2>
					<p>
						tfe.nl gaat zeer zorgvuldig om met haar bezoekersinformatie en zal deze gegevens nimmer aan
						derden ter beschikking stellen. Lees meer over ons
						<nuxt-link to="/privacy" itemprop="url">Privacy- en Cookiebeleid.</nuxt-link>
					</p>
					<div>
						<button class="button--reset" @click="accept()">Akkoord</button>
						<button
							class="button--reset"
							aria-controls="cookie-settings"
							aria-expanded="false"
							@click="change()"
						>
							Wijzigen <span class="icon">›</span>
						</button>
					</div>
				</article>
			</div>
		</transition>

		<transition>
			<div
				v-if="displayPopup"
				id="cookie-settings"
				class="cookie-settings"
				role="dialog"
				aria-label="Cookie instelling"
				:hidden="!displayPopup"
			>
				<button
					class="cookie-close button--reset"
					aria-controls="cookie-settings"
					aria-expanded="false"
					aria-label="Sluit dialog"
					@click="change()"
				></button>
				<article class="rich-text">
					<p>
						Jij kan hieronder instellen welke cookies jij van ons accepteert. Houd er rekening mee dat door
						het niet accepteren van cookies jouw website ervaring niet optimaal kan zijn. Meer informatie
						over het gebruik van gegevens van verschillende cookies vind je in ons
						<nuxt-link to="/privacy" itemprop="url">Privacy- en Cookiebeleid.</nuxt-link>
					</p>
					<ul class="cookie-list">
						<li>
							<input
								id="cookie-level-0"
								v-model="privacyLevel"
								type="radio"
								name="cookie privacy level"
								value="0"
							/>
							<label for="cookie-level-0">Zeer beperkt</label>
							<article class="cookie-settings-content">
								<p>
									Op dit niveau worden alleen de essentiële cookies geladen. We sturen alleen
									geanonimiseerde basisinformatie naar Analytics. Externe diensten zoals YouTube en
									bv. social feeds functioneren niet.
								</p>
							</article>
						</li>
						<li>
							<input
								id="cookie-level-1"
								v-model="privacyLevel"
								type="radio"
								name="cookie privacy level"
								value="1"
							/>
							<label for="cookie-level-1">Beperkt</label>
							<article class="cookie-settings-content">
								<p>
									Er worden alleen cookies geladen die noodzakelijk zijn om de website te laden en we
									versturen geanonimiseerde data naar Analytics om onze website te verbeteren.
								</p>
							</article>
						</li>
						<li>
							<input
								id="cookie-level-2"
								v-model="privacyLevel"
								type="radio"
								name="cookie privacy level"
								value="2"
							/>
							<label for="cookie-level-2">Standaard</label>
							<article class="cookie-settings-content">
								<p>
									Op dit niveau functioneert de website optimaal. We versturen gegevens naar externe
									partijen zoals Google Analytics en YouTube om je website ervaring te verbeteren. We
									slaan hierbij geen persoonsgegevens op.
								</p>
							</article>
						</li>
					</ul>
				</article>
				<button class="cookie-save button--reset" @click="save()">Opslaan</button>
			</div>
		</transition>
	</div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class Default extends Vue {
	displayBanner = false;
	displayPopup = false;
	privacyLevel = 2;

	mounted() {
		const cookie = this.getPrivacy();

		if (!cookie) {
			this.displayBanner = true;
		}
	}

	accept() {
		this.setPrivacy();
		this.displayBanner = false;
		this.$gtm.push({
			event: 'tfe-event',
			'tfe-data': {
				category: 'Cookies',
				action: 'Accept',
				label: 'Standaard',
			},
		});
	}

	change() {
		this.displayPopup = !this.displayPopup;
		this.displayBanner = !this.displayBanner;
	}

	save() {
		this.displayPopup = false;
		this.displayBanner = false;
		this.$gtm.push({
			event: 'tfe-event',
			'tfe-data': {
				category: 'Cookies',
				action: 'Accept',
				label: this.privacyLevel === 2 ? 'Standaard' : this.privacyLevel === 1 ? 'Beperkt' : 'Zeer beperkt',
			},
		});

		this.setPrivacy();
	}

	getPrivacy() {
		return localStorage.getItem('privacy');
	}

	setPrivacy() {
		localStorage.setItem('privacy', this.privacyLevel);
	}
}
</script>

<style lang="scss" scoped>
.cookie-bar {
	display: flex;
	justify-content: center;
	position: fixed;
	right: $spacing;
	bottom: $spacing * 5;
	z-index: 4;

	h2 {
		font-family: $font-highlight;
		font-size: $font;
		margin-bottom: 1.5rem;
	}

	button {
		color: $black;
		font-size: 1.5rem;
		font-family: $font-highlight;
		border: 1px solid $color;
		padding: $spacing * 0.9 $spacing * 2.5 $spacing * 0.9 $spacing * 2;
		line-height: 1.5;
		transform: translateY(0.1em);
		text-align: center;
		display: block;
		width: 100%;
		transition: border-color 0.3s ease-in-out;

		.icon {
			color: $pink;
			font-size: 2.8rem;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: $spacing * 1.5;
			margin-left: 1rem;
			transition: color 0.3s ease-in-out;
		}

		&:hover,
		&:focus {
			border-color: rgba($color, 0.5);
			background-color: $color;
			color: $white;

			.icon {
				color: $color;
			}
		}

		&:first-of-type {
			color: $white;
			border: 1px solid $color;
			background-color: $color;
			padding: $spacing * 0.9 $spacing * 2;
			margin-bottom: 0.5rem;
			font-size: 1.5rem;
			transition: all 0.3s ease-in-out;
			margin-right: 2rem;

			&:hover,
			&:focus {
				background-color: $white;
				color: $color;
			}
		}
	}
}

.cookie-bar-content {
	max-width: 45rem;
	background-color: $white;
	padding: $spacing;
	margin-left: $spacing;
	border: 1px solid $grey;
	box-shadow: 0 5rem 4rem -2rem rgba($black, 0.2);

	p {
		color: $black;
		font-size: $font;
		line-height: 2;
		font-family: $font-base;
	}

	a {
		position: relative;
		color: $black;

		&::after {
			position: absolute;
			content: '';
			height: 1px;
			left: 0;
			right: 0;
			background-color: $pink;
			bottom: -1px;
			transform-origin: center right;
			transition: transform 0.3s ease-in-out;
		}

		&:hover {
			color: $pink;

			&::after {
				transform: scaleX(0.0001);
			}
		}
	}

	> div {
		margin-top: 3rem;
	}
}

.cookie-settings {
	position: fixed;
	top: 0;
	height: 100%;
	left: 0;
	right: 0;
	padding: $spacing * 2 $spacing;
	z-index: 4;
	margin: 0 auto;
	max-width: 65rem;
	background-color: $white;

	p {
		margin-bottom: 2rem;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.rich-text {
		max-height: 65vh;
		overflow-y: auto;
		margin: $spacing 0;
	}
}

.cookie-close {
	background-color: transparent;
	position: absolute;
	right: $spacing * 0.5;
	top: $spacing * 0.5;
	padding: 1em;
	transform-origin: center;
	transition: all 0.25s ease-in-out;
	width: 5rem;
	height: 5rem;

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-45deg);
		width: 24px;
		height: 24px;
		height: 4px;
		background-color: $color-head;
		transition: background-color 0.25s ease-in-out;
	}

	&::after {
		transform: translate(-50%, -50%) rotate(45deg);
	}

	&:hover {
		transform: rotate(90deg);

		&::before,
		&::after {
			background-color: $pink;
		}
	}
}

.cookie-save {
	background-color: $color;
	font-size: $font;
	border: 1px solid $color;
	padding: $spacing * 0.8 $spacing * 2;
	color: $white;
	font-family: $font-highlight;
	transition: all 0.3s ease-in-out;

	&:hover {
		background-color: $white;
		color: $color;
	}
}

.cookie-list {
	list-style: none;
	margin-bottom: $spacing;

	article {
		margin-left: 36px;
		margin-bottom: 1rem;
	}

	li {
		&::before {
			display: none;
		}
	}

	ul {
		margin-left: 5.2rem;
		list-style-type: disc;
	}

	label {
		position: relative;
		font-weight: 700;
	}

	[type='radio'] {
		margin-right: 14px;
		opacity: 0.0001;

		+ label {
			&::before {
				position: absolute;
				left: -36px;
				top: 0;
				content: '';
				display: block;
				width: 22px;
				height: 22px;
				background-color: #fff;
				border: 1px solid $pink;
				border-radius: 50%;
			}

			&::after {
				position: absolute;
				left: -32px;
				top: 4px;
				content: '';
				display: block;
				width: 14px;
				height: 14px;
				background-color: $pink;
				border-radius: 50%;
				opacity: 0;
				transition: opacity 0.2s ease;
			}
		}

		&:checked {
			+ label {
				&::after {
					opacity: 1;
				}
			}
		}
	}
}

@media all and (min-width: $m) {
	.cookie-bar {
		right: $spacing * 1.5;
		bottom: $spacing * 7;

		article {
			margin-left: $spacing * 1.5;
		}
	}

	.cookie-settings {
		top: 5vh;
		height: auto;
		border: 1px solid $grey;
		padding: $spacing * 2;
		box-shadow: 0 5rem 4rem -2rem rgba($black, 0.2);

		&::before {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 4rem;
			bottom: 12rem;
			left: 0;
			z-index: 1;
			background-image: linear-gradient(transparent 0%, $white 100%);
		}

		.rich-text {
			max-height: 60rem;
			padding-bottom: $spacing;
		}
	}
}

@media all and (min-width: $l) {
	.cookie-bar {
		bottom: $spacing * 1.5;

		article {
			max-width: 50rem;
			padding: $spacing * 1.5;
		}

		button {
			display: inline-block;
			width: auto;
		}
	}
}

// animations
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s 0.5s, transform 0.5s 0.5s;
}

.v-enter,
.v-leave-to {
	opacity: 0;
	transform: translate3d(0, 2rem, 0);
}
</style>
