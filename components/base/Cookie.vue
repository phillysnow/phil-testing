<template>
	<div>
		<transition>
			<div
				v-if="displayBanner"
				class="cookie-bar"
				role="dialog"
				aria-label="Cookiemelding"
				:hidden="!displayBanner"
			>
				<article class="cookie-bar-content">
					<svg>
						<use xlink:href="#cookie" />
					</svg>
					<p>
						tfe.nl gaat zeer zorgvuldig om met haar bezoekers informatie en zal deze gegevens nimmer aan
						derden ter beschikking stellen. Lees meer over ons
						<a href="/privacy">Privacy- en Cookiebeleid.</a>
					</p>
					<div>
						<button class="button--reset" @click="accept()">
							Akkoord
						</button>
						<button
							class="button--reset"
							aria-controls="cookie-settings"
							aria-expanded="false"
							@click="change()"
						>
							Voorkeur aanpassen
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
				>
					<svg>
						<use xlink:href="#close" />
					</svg>
				</button>
				<article class="rich-text">
					<p>
						Jij kan hieronder instellen welke cookies jij van ons accepteert. Houd er rekening mee dat door
						het niet accepteren van cookies jouw website ervaring niet optimaal kan zijn. Meer informatie
						over het gebruik van gegevens van verschillende cookies vind je in ons
						<a href="#">Privacy- en Cookiebeleid.</a>
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

					<button class="cookie-save button--reset" @click="save()">
						instellingen opslaan
					</button>
				</article>
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
	}

	change() {
		this.displayPopup = !this.displayPopup;
		this.displayBanner = !this.displayBanner;
	}

	save() {
		this.displayPopup = false;
		this.displayBanner = false;

		this.setPrivacy();
	}

	getPrivacy() {
		return localStorage.getItem('privacy');
	}

	setPrivacy() {
		this.createCookie({
			name: 'privacy',
			value: this.privacyLevel,
			days: 30,
		});
		localStorage.setItem('privacy', this.privacyLevel);
	}

	// eslint-disable-next-line class-methods-use-this
	createCookie({ name, value, days }) {
		// eslint-disable-next-line init-declarations
		let expires;
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
			expires = '; expires=' + date.toGMTString();
		} else {
			expires = '';
		}
		document.cookie = name + '=' + value + expires + '; path=/';
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

	svg {
		width: 5rem;
		height: 5rem;
		margin-bottom: 1rem;
	}

	button {
		color: $black;
		font-size: $font-m;
		line-height: 1.5;
		transform: translateY(0.1em);
		text-align: center;
		display: block;
		width: 100%;
		padding: $spacing * 0.25 $spacing;

		&:hover,
		&:focus {
			color: $pink;
		}

		&:first-of-type {
			border: 2px solid $light-grey;
			padding: $spacing * 0.5 $spacing;
			margin-bottom: 0.5rem;

			&:hover,
			&:focus {
				border-color: $green;
				color: $green;
			}
		}
	}
}

.cookie-bar-content {
	max-width: 45rem;
	background-color: $white;
	padding: $spacing;
	margin-left: $spacing;
	box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.3), 0 21px 13px -5px rgba(0, 0, 0, 0.2);

	p {
		color: $black;
		font-size: $font;
		line-height: 2.4;
		font-family: $font-base;
	}

	a {
		color: $green;
	}

	> div {
		margin-top: 2rem;
	}
}

.cookie-settings {
	position: fixed;
	top: 5vh;
	left: 0;
	right: 0;
	padding: 50px 40px 20px;
	z-index: 4;
	overflow-y: auto;
	max-height: 90vh;
	margin: 0 auto;
	max-width: 65rem;
	background-color: $white;
	box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.3), 0 21px 13px -5px rgba(0, 0, 0, 0.2);

	p {
		margin-bottom: 2rem;

		&:last-child {
			margin-bottom: 0;
		}
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

	svg {
		width: 100%;
		height: 100%;
	}

	&:hover {
		fill: $pink;
		transform: rotate(90deg);
	}
}

.cookie-save {
	font-size: $font-m;
	border: 2px solid $light-grey;
	padding: $spacing * 0.5 $spacing;

	&:hover {
		border-color: $green;
		color: $green;
	}
}

.cookie-list {
	list-style: none;
	margin-bottom: $spacing;

	article {
		margin-left: 30px;
		margin-bottom: 1rem;
	}

	ul {
		margin-left: 5.2rem;
		list-style-type: disc;
	}

	label {
		position: relative;
		font-weight: 700;

		&:hover {
			color: $green;
		}
	}

	[type='radio'] {
		margin-right: 8px;
		opacity: 0.0001;

		+ label {
			&::before {
				position: absolute;
				left: -26px;
				top: 0;
				content: '';
				display: block;
				width: 15px;
				height: 15px;
				background-color: #fff;
				border: 1px solid $green;
				border-radius: 50%;
			}

			&::after {
				position: absolute;
				left: -24px;
				top: 2px;
				content: '';
				display: block;
				width: 11px;
				height: 11px;
				background-color: $green;
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
}

@media all and (min-width: $l) {
	.cookie-bar {
		bottom: $spacing * 1.5;

		article {
			max-width: 50rem;
			padding: $spacing;
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
	transform: translateY(2rem);
}
</style>
