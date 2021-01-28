<template>
	<div class='station-list'>
		<div class='station-list__search'>
			<input v-on:input="filterByText($event)" v-on:keyup="executeByText($event)" class="search__input" type="text" placeholder="Search Rivers..." name="search" id="searchRiver" aria-expanded="false"/>
			<ul v-if="textDropdownResults" class="search__results">
				<li v-for="station in textDropdownResults" v-on:click="selectStation(station.stationNumber)" class="river-filter" tabindex="0">
					{{station.name}}
				</li>
			</ul>
		</div>
		<div v-if='loading' class='station-list__loader'><p>Loading Stations</p><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div></div>
		<div v-for='station in selection' class='station-list__item'>
			<div class='station-list__item-left'>
				<h2>{{station.name}}</h2>
			</div>
			<div class='station-list__item-right'>
				<div v-if="station.cfs.length >= 2" class='stats-summary'>
					<p v-bind:class="historicComparisonClass(station.cfs)" v-if="station.cfs.length > 0 && station.cfs[(station.cfs.length)-1].reading >= 0">
						<span aria-label='current cfs'>{{round(station.cfs[(station.cfs.length)-1].reading, 1)}}</span><span class='stats-summary__unit'> CFS</span>
						<span v-if='compareHistoric(station.cfs)' aria-label='stats-summary__change'>
							({{compareHistoric(station.cfs)}})
						</span>
					</p>
					<p v-else-if="station.cfs.length > 0 && station.cfs[(station.cfs.length)-1].errorCode === 'Ice'">
						<span aria-label='current cfs'>Iced</span>
					</p>
					<p v-else-if="station.cfs.length > 0 && station.cfs[(station.cfs.length)-1].errorCode === 'Eqp'">
						<span aria-label='current cfs'>Equipment Malfunction</span>
					</p>
					<p v-else-if="station.cfs.length > 0 && station.cfs[(station.cfs.length)-1].errorCode === 'Ssn'">
						<span aria-label='current cfs'>Seasonally Inactive</span>
					</p>
					<p v-else-if="station.cfs.length > 0 && typeof station.cfs[(station.cfs.length)-1].errorCode === 'string'">
						<span aria-label='current cfs'>Meter Issue (<a href="https://help.waterdata.usgs.gov/codes-and-parameters/instantaneous-and-daily-value-status-codes" target="_blank">USGS Code: {{station.cfs[(station.cfs.length)-1].errorCode}}</a>)</span>
					</p>
					<p v-bind:class="historicComparisonClass(station.temp)" v-if="station.temp.length > 2 && station.temp[station.temp.length-1] && !isNaN(station.temp[station.temp.length-1].reading)">
						 	<span aria-label='current temperature'>{{toFarenheit(station.temp[(station.temp.length)-1].reading)}}</span><span class='stats-summary__unit'>°F</span>
							<span v-if='compareHistoric(station.temp)' aria-label='stats-summary__change'>
								({{compareHistoric(station.temp)}})
							</span>
					</p>
					<a class='button button-blue button-medium' :href="generateUrl(station, 'local')" role="button" :aria-label="`view full report for ${station.name}`">View Page</a>
				</div>
				<div v-else class='stats-summary'>
					<p class='stats-summary__inactive'>
						Station currently inactive, see <a target="blank" :href="generateUrl(station, 'usgs')" :aria-label="`${station.name} is inactive`">USGS page</a> for more info
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

//import necessary mixins
import axios from 'axios';
import { HistoricComparisons, MathUtils } from '../mixins/generalUtils.js';

export default {

	data() {
		return {
			loading: false,
			selection: null,
			cfsStations: [],
      textDropdownResults: null
		}
	},

	created: function(){
		this.fetchData();
	},

	methods: {
		fetchData() {
			this.loading = true;
			let user = JSON.parse(document.querySelector('#dataPasser').dataset.user);

			axios.get(`/api/stations/user/${user._id}`).then(res => {
				this.cfsStations = res.data;
				this.selection = this.cfsStations;
				this.loading = false;
			});
		},

		generateUrl(station, context) {
			if (context.toLowerCase() == 'usgs') {
				return `https://waterdata.usgs.gov/nwis/uv?site_no=${station.stationNumber}&agency_cd=USGS`;
			} else if (context.toLowerCase() == 'local') {
				return `/site/${station.stationNumber}`;
			}
		},

		toFarenheit(temp) {
			return Math.round((temp * (9/5)) + 32);
		},

		filterByText(event) {
			if(event.target.value) {
					this.textDropdownResults = this.cfsStations.filter(station => station.name.toUpperCase().includes(event.target.value.toUpperCase()));
			} else {
				this.textDropdownResults = null;
			}
		},

		executeByText(event) {
				if(event.code === 'Enter') {
					if(event.target.value) {
						this.textDropdownResults = null;
						this.selection = this.cfsStations.filter(station => station.name.toUpperCase().includes(event.target.value.toUpperCase()));
					} else {
						this.textDropdownResults = null;
					}
				}
		},

		selectStation(id) {
			this.textDropdownResults = null;
			this.selection = this.cfsStations.filter(station => station.stationNumber === id);
		}
	},

	mixins: [
		MathUtils,
		HistoricComparisons
	]
}
</script>
