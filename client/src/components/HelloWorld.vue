<template>
  <page-header
    icon="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
    title="Zillow Home Value Index (ZHVI)"
  />
  <div>
    <button value="1" @click="updateTimeRange('1')">1 Mo</button>
    <button value="6" @click="updateTimeRange('6')">6 Mo</button>
    <button value="1" @click="updateTimeRange('1')">1 Yr</button>
    <button value="5" @click="updateTimeRange('5')">5 Yr</button>
    <button value="Max" @click="updateTimeRange('Max')">Max</button>
  </div>
  <mapbox-gl :map-data="mapData"></mapbox-gl>
</template>

<script>
import axios from 'axios';
import { regionRequestParams } from "../utils/mapUtils";
import MapboxGl from "./MapboxGl.vue";
import PageHeader from "./PageHeader.vue";
import SummaryTable from "./SummaryTable.vue";
import ChartSection from"./ChartSection.vue";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    MapboxGl,
    PageHeader,
    SummaryTable,
    ChartSection
  },
  methods: {
    updateTimeRange: (timeRange) => {
      axios.get("/api/regions/all", { params: regionRequestParams[timeRange] })
      .then(res => {
        this.mapData = res.data.response.geoJson;
      })
    }
  },
  data() {
    return {
      timeRange: "1",
      mapData: {
    "features": [
        {
            "geometry": {
                "coordinates": [
                    -98.69609684033468,
                    45.5215655194395
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4484982036316385,
                "regionName": "Aberdeen, SD",
                "usdGrowth": 5574,
                "zhvi": 230048
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.78205671698841,
                    47.14003704888718
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9248036056037963,
                "regionName": "Aberdeen, WA",
                "usdGrowth": 10396,
                "zhvi": 359789.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.71755371507506,
                    32.449774608922446
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8199061029246628,
                "regionName": "Abilene, TX",
                "usdGrowth": 3338,
                "zhvi": 184568
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.6833719856536,
                    34.729598476460374
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3871117988754706,
                "regionName": "Ada, OK",
                "usdGrowth": 3440,
                "zhvi": 145284
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.06603726805751,
                    41.89475155520743
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2685314362084736,
                "regionName": "Adrian, MI",
                "usdGrowth": 2859,
                "zhvi": 228221
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.3496869872968,
                    41.14818495577485
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.412962571758702,
                "regionName": "Akron, OH",
                "usdGrowth": 2919,
                "zhvi": 208001
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.74176041801631,
                    32.61348406406758
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4025581454807665,
                "regionName": "Alamogordo, NM",
                "usdGrowth": 4325,
                "zhvi": 181769
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.17493628977074,
                    31.58904494327866
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.452259213882008,
                "regionName": "Albany, GA",
                "usdGrowth": 5268,
                "zhvi": 154838.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.93972937930175,
                    42.789089176258734
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.550721674917484,
                "regionName": "Albany, NY",
                "usdGrowth": 6996,
                "zhvi": 276580
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.53731544866541,
                    44.48899493847011
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.4643422203615408,
                "regionName": "Albany, OR",
                "usdGrowth": 1911,
                "zhvi": 412041.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.3488442186552,
                    43.67385582534481
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5655620863985247,
                "regionName": "Albert Lea, MN",
                "usdGrowth": 4243,
                "zhvi": 166923
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.30486726797962,
                    34.369759637967704
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.3383603197063636,
                "regionName": "Albertville, AL",
                "usdGrowth": 2577,
                "zhvi": 193619
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.47214284008207,
                    35.122002014812175
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6610596726366431,
                "regionName": "Albuquerque, NM",
                "usdGrowth": 5185,
                "zhvi": 314384.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.54047306124384,
                    31.33244664987422
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8384135299366084,
                "regionName": "Alexandria, LA",
                "usdGrowth": 4375,
                "zhvi": 155847.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.4533546870787,
                    45.93348490551636
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9635678099218233,
                "regionName": "Alexandria, MN",
                "usdGrowth": 2993,
                "zhvi": 311500
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.09047050305038,
                    27.731039377856174
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.688330297367509,
                "regionName": "Alice, TX",
                "usdGrowth": 4835,
                "zhvi": 132965
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.40081585248276,
                    40.7891141321521
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.306511223437255,
                "regionName": "Allentown, PA",
                "usdGrowth": 6970,
                "zhvi": 304316.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.60505416106196,
                    43.29265605439979
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3629457431383374,
                "regionName": "Alma, MI",
                "usdGrowth": 3154,
                "zhvi": 134768.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.62212411179414,
                    45.03477666249393
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6528553888296154,
                "regionName": "Alpena, MI",
                "usdGrowth": 3793,
                "zhvi": 144448.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.34917411805864,
                    40.47961444454896
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2288762327734133,
                "regionName": "Altoona, PA",
                "usdGrowth": 1800,
                "zhvi": 147374.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.41138784198064,
                    34.58781740640223
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2251800782053053,
                "regionName": "Altus, OK",
                "usdGrowth": 2026,
                "zhvi": 91853.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.91042205743138,
                    35.248820951914546
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7541364311012926,
                "regionName": "Amarillo, TX",
                "usdGrowth": 3517,
                "zhvi": 201970.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.22948195512397,
                    32.09908023740648
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3190514056237292,
                "regionName": "Americus, GA",
                "usdGrowth": 3965,
                "zhvi": 121158.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.46499004753204,
                    42.03621212545703
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7825402857642372,
                "regionName": "Ames, IA",
                "usdGrowth": 4125,
                "zhvi": 232480.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -74.44011631820604,
                    42.901234944522
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2540899289822747,
                "regionName": "Amsterdam, NY",
                "usdGrowth": 3609,
                "zhvi": 161557
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -149.54549628375202,
                    62.23574705908824
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.430938455781588,
                "regionName": "Anchorage, AK",
                "usdGrowth": 15964,
                "zhvi": 367080.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -102.63765482909949,
                    32.304686329085435
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.525776069681324,
                "regionName": "Andrews, TX",
                "usdGrowth": 5968,
                "zhvi": 239696.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.00101093600364,
                    41.64423867530167
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.572634112098734,
                "regionName": "Angola, IN",
                "usdGrowth": 6463,
                "zhvi": 253862.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.83853203938331,
                    42.2531050036005
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.766293467203721,
                "regionName": "Ann Arbor, MI",
                "usdGrowth": 2868,
                "zhvi": 375973.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.82630386048143,
                    33.77483727169395
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.8520229049642931,
                "regionName": "Anniston, AL",
                "usdGrowth": -1246,
                "zhvi": 145403.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.37140192940527,
                    44.28871978279849
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.5765474149269636,
                "regionName": "Appleton, WI",
                "usdGrowth": 1546,
                "zhvi": 269198
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.80941373380176,
                    27.1867789302738
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.73895942903666,
                "regionName": "Arcadia, FL",
                "usdGrowth": 10332,
                "zhvi": 222544.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.28552485440106,
                    34.25103751139722
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.5299546812133813,
                "regionName": "Ardmore, OK",
                "usdGrowth": 4583,
                "zhvi": 132178.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.17484712973815,
                    34.04613431718551
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.840294722906271,
                "regionName": "Arkadelphia, AR",
                "usdGrowth": 2217,
                "zhvi": 121191
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.68369504810941,
                    35.598836523459084
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9493276705208271,
                "regionName": "Asheville, NC",
                "usdGrowth": 7919,
                "zhvi": 409942.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.27280780843077,
                    40.847722770094435
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.828062780182674,
                "regionName": "Ashland, OH",
                "usdGrowth": 5544,
                "zhvi": 198191.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.74830217691881,
                    41.70860331789125
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2069012278938749,
                "regionName": "Ashtabula, OH",
                "usdGrowth": 1860,
                "zhvi": 154702.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.66071097409136,
                    45.99712889492197
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4687220047945013,
                "regionName": "Astoria, OR",
                "usdGrowth": 13087,
                "zhvi": 534232.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.30870025929116,
                    39.53185661266914
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9683478252860573,
                "regionName": "Atchison, KS",
                "usdGrowth": 5127,
                "zhvi": 131340.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.2154059824868,
                    33.94918024910755
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3722455570126,
                "regionName": "Athens, GA",
                "usdGrowth": 10513,
                "zhvi": 315564.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.04278644453149,
                    39.3342563433883
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2909913646157194,
                "regionName": "Athens, OH",
                "usdGrowth": 5991,
                "zhvi": 184318
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.61520715094525,
                    35.42812616245447
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0909521782190734,
                "regionName": "Athens, TN",
                "usdGrowth": 6007,
                "zhvi": 196465.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.85846586777237,
                    32.21128872083827
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.2029616182486444,
                "regionName": "Athens, TX",
                "usdGrowth": 14855,
                "zhvi": 291079.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.3991573684317,
                    33.693610134826606
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8899722884108006,
                "regionName": "Atlanta, GA",
                "usdGrowth": 3376,
                "zhvi": 381917.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -74.65848483266721,
                    39.475386926127854
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.28575149147331724,
                "regionName": "Atlantic City, NJ",
                "usdGrowth": 880,
                "zhvi": 310977.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.35132245670717,
                    32.60154883143882
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.732418919152524,
                "regionName": "Auburn, AL",
                "usdGrowth": 12925,
                "zhvi": 278764
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.99906934201438,
                    41.39804622306632
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.326996929878585,
                "regionName": "Auburn, IN",
                "usdGrowth": 4850,
                "zhvi": 210033.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.55731592167184,
                    42.91261713760631
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6055837021694184,
                "regionName": "Auburn, NY",
                "usdGrowth": 4623,
                "zhvi": 179148
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.98424289353831,
                    33.458813732969595
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.299382335050803,
                "regionName": "Augusta, GA",
                "usdGrowth": 7370,
                "zhvi": 226073.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -69.76738543562293,
                    44.40759555109715
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8580326949910595,
                "regionName": "Augusta, ME",
                "usdGrowth": 5102,
                "zhvi": 277623
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.75234549393952,
                    43.67142873734916
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4531357474657498,
                "regionName": "Austin, MN",
                "usdGrowth": 2578,
                "zhvi": 178522.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.6550906633184,
                    30.26257983645896
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -5.094023952838839,
                "regionName": "Austin, TX",
                "usdGrowth": -29299,
                "zhvi": 564600.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.5761953627333,
                    30.87967777905888
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.4556036009215045,
                "regionName": "Bainbridge, GA",
                "usdGrowth": 5130,
                "zhvi": 150885.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -118.72777962905693,
                    35.343294250343696
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4086273858560965,
                "regionName": "Bakersfield, CA",
                "usdGrowth": 4774,
                "zhvi": 342276.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.03530977238573,
                    39.06198912381181
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9057206086344332,
                "regionName": "Baltimore, MD",
                "usdGrowth": 3384,
                "zhvi": 375104.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -68.65020454954114,
                    45.40194592960498
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7756243109973815,
                "regionName": "Bangor, ME",
                "usdGrowth": 4269,
                "zhvi": 242321.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.94966132387638,
                    43.425740867404365
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.545762426592745,
                "regionName": "Baraboo, WI",
                "usdGrowth": 12095,
                "zhvi": 269780.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.4657193030935,
                    37.80335779134808
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9163687546625274,
                "regionName": "Bardstown, KY",
                "usdGrowth": 6754,
                "zhvi": 233735.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -70.2885433896272,
                    41.729805775696846
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8256702940501548,
                "regionName": "Barnstable Town, MA",
                "usdGrowth": 12559,
                "zhvi": 693749
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -72.61604977898986,
                    44.273432408263695
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 9.466257346867625,
                "regionName": "Barre, VT",
                "usdGrowth": 31809,
                "zhvi": 349854
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.90514103999641,
                    36.71380786194807
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.8350453463195044,
                "regionName": "Bartlesville, OK",
                "usdGrowth": -1320,
                "zhvi": 154240
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.19135193152931,
                    43.00226010054302
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3267477530355105,
                "regionName": "Batavia, NY",
                "usdGrowth": 4252,
                "zhvi": 184026.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.57001640887309,
                    35.74242707035785
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7440326775905732,
                "regionName": "Batesville, AR",
                "usdGrowth": 2316,
                "zhvi": 133557
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.13403385938169,
                    30.570632993612566
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5347202508675077,
                "regionName": "Baton Rouge, LA",
                "usdGrowth": 3606,
                "zhvi": 236337.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.00493569483731,
                    42.24633833784932
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.3750837097537096,
                "regionName": "Battle Creek, MI",
                "usdGrowth": -3993,
                "zhvi": 166633
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.98731479179733,
                    43.70639106291666
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.1326158139919191,
                "regionName": "Bay City, MI",
                "usdGrowth": 1721,
                "zhvi": 152961.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.01230293897189,
                    28.819557457552733
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.603378710674003,
                "regionName": "Bay City, TX",
                "usdGrowth": 7969,
                "zhvi": 224936.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.6894670440417,
                    40.26186809132172
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2609708037805474,
                "regionName": "Beatrice, NE",
                "usdGrowth": 3422,
                "zhvi": 152651.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.0681947715803,
                    30.30565996504369
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9644553661954385,
                "regionName": "Beaumont, TX",
                "usdGrowth": 6501,
                "zhvi": 166170.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.70928177868963,
                    43.415766615349405
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8402763775050544,
                "regionName": "Beaver Dam, WI",
                "usdGrowth": 4306,
                "zhvi": 235957.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.15786958667584,
                    37.909743661267754
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6716259090711147,
                "regionName": "Beckley, WV",
                "usdGrowth": 1699,
                "zhvi": 102204
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.48361628974209,
                    38.84112637167425
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6160124480463298,
                "regionName": "Bedford, IN",
                "usdGrowth": 2706,
                "zhvi": 168317
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.7421559261013,
                    28.41761667867073
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.6638457539358082,
                "regionName": "Beeville, TX",
                "usdGrowth": 6311,
                "zhvi": 174422.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.76784340604392,
                    40.389965253653564
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0587563165740006,
                "regionName": "Bellefontaine, OH",
                "usdGrowth": 4182,
                "zhvi": 204913
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.74900177763097,
                    48.822279759135974
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7653754413621701,
                "regionName": "Bellingham, WA",
                "usdGrowth": 4889,
                "zhvi": 643436.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.9373213873102,
                    47.97373526811944
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6067328233542417,
                "regionName": "Bemidji, MN",
                "usdGrowth": 6247,
                "zhvi": 241913.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.22891213571914,
                    43.91570171492497
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.2958263270789843,
                "regionName": "Bend, OR",
                "usdGrowth": -22830,
                "zhvi": 685445.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.6756115190891,
                    34.599055765686444
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.7480449428223945,
                "regionName": "Bennettsville, SC",
                "usdGrowth": 3584,
                "zhvi": 76854.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.0904886750896,
                    43.03519827722818
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8340712572790554,
                "regionName": "Bennington, VT",
                "usdGrowth": 6028,
                "zhvi": 331288.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -71.4222068093806,
                    44.70054319112378
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8971600440173537,
                "regionName": "Berlin, NH",
                "usdGrowth": 5266,
                "zhvi": 183882
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.32463223246104,
                    43.64064262367323
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 6.149096620357474,
                "regionName": "Big Rapids, MI",
                "usdGrowth": 11013,
                "zhvi": 181810.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.47805917321932,
                    32.08860015581104
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.346906085987131,
                "regionName": "Big Spring, TX",
                "usdGrowth": 5990,
                "zhvi": 181438.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.50274075022826,
                    37.04140172598199
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1359444584583893,
                "regionName": "Big Stone Gap, VA",
                "usdGrowth": 2025,
                "zhvi": 95661
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.71682029628548,
                    45.78362642469131
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.15254805074789,
                "regionName": "Billings, MT",
                "usdGrowth": 11635,
                "zhvi": 374030
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.02563600853811,
                    42.16310529186281
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4158135062975727,
                "regionName": "Binghamton, NY",
                "usdGrowth": 2324,
                "zhvi": 165005
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.81398683648712,
                    33.46385808175169
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.571287468592496,
                "regionName": "Birmingham, AL",
                "usdGrowth": 3865,
                "zhvi": 247388.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.988138858006,
                    46.72885374849609
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2449876199558871,
                "regionName": "Bismarck, ND",
                "usdGrowth": 4064,
                "zhvi": 328089.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.39784373333015,
                    43.2167287965246
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.023595299508047,
                "regionName": "Blackfoot, ID",
                "usdGrowth": 10885,
                "zhvi": 364721
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.53454806046615,
                    37.12147118575922
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5945650770517474,
                "regionName": "Blacksburg, VA",
                "usdGrowth": 6871,
                "zhvi": 267698
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.86205369616188,
                    40.41128283381288
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2176139100516097,
                "regionName": "Bloomington, IL",
                "usdGrowth": 4572,
                "zhvi": 208439.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.67677814769995,
                    39.23409017957933
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1631992025709197,
                "regionName": "Bloomington, IN",
                "usdGrowth": 6082,
                "zhvi": 283242.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.45640599890852,
                    41.04468007863712
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5814544798584396,
                "regionName": "Bloomsburg, PA",
                "usdGrowth": 5747,
                "zhvi": 224962
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.36378394003304,
                    37.24772383720178
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.073776326320915,
                "regionName": "Bluefield, WV",
                "usdGrowth": 2177,
                "zhvi": 105814.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.05194370481865,
                    35.76271485255534
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.019189425273371,
                "regionName": "Blytheville, AR",
                "usdGrowth": 2237,
                "zhvi": 111449.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.03866652098516,
                    30.852885477499395
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2244861404162128,
                "regionName": "Bogalusa, LA",
                "usdGrowth": 1648,
                "zhvi": 135445
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -116.14244843411636,
                    43.017386008569574
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.9176771552055154,
                "regionName": "Boise City, ID",
                "usdGrowth": -19789,
                "zhvi": 499963
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.70033724174134,
                    36.23103602902211
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.3863346050869893,
                "regionName": "Boone, NC",
                "usdGrowth": -1845,
                "zhvi": 474912.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.35466431772775,
                    35.84006574407569
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3003077911037946,
                "regionName": "Borger, TX",
                "usdGrowth": 3157,
                "zhvi": 97059.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -71.09606540742928,
                    42.549168277501934
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.17846700796727488,
                "regionName": "Boston, MA",
                "usdGrowth": -1162,
                "zhvi": 649782.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.35467667576428,
                    40.09313619321123
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.2690278062064166,
                "regionName": "Boulder, CO",
                "usdGrowth": -25572,
                "zhvi": 773802.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.40827131002344,
                    37.03973301501927
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.461431704802758,
                "regionName": "Bowling Green, KY",
                "usdGrowth": 7611,
                "zhvi": 222131.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -111.16925711338116,
                    45.54486106419817
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 8.968945430740094,
                "regionName": "Bozeman, MT",
                "usdGrowth": 56829,
                "zhvi": 662655.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.56478358048426,
                    41.80938601702356
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3384204268269615,
                "regionName": "Bradford, PA",
                "usdGrowth": 2155,
                "zhvi": 93096.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.24166636630642,
                    46.797193158195846
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.533144818424602,
                "regionName": "Brainerd, MN",
                "usdGrowth": 4653,
                "zhvi": 309296.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.2246876314802,
                    36.69724138439629
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.091626586819787,
                "regionName": "Branson, MO",
                "usdGrowth": 10220,
                "zhvi": 253059.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.11507621401573,
                    39.63803231755079
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.651646169151936,
                "regionName": "Breckenridge, CO",
                "usdGrowth": -38945,
                "zhvi": 1055769.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.64360612192809,
                    47.63479025641077
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.3733274996089516,
                "regionName": "Bremerton, WA",
                "usdGrowth": 2179,
                "zhvi": 585082.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.40946245525416,
                    30.214984982997397
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.039191877278078,
                "regionName": "Brenham, TX",
                "usdGrowth": 13720,
                "zhvi": 345775.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.7963842257862,
                    35.20383864371965
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.256931337906791,
                "regionName": "Brevard, NC",
                "usdGrowth": 16327,
                "zhvi": 390847.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.38811710039802,
                    41.2680989624289
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.544330831880261,
                "regionName": "Bridgeport, CT",
                "usdGrowth": 8615,
                "zhvi": 562595.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.45391914538324,
                    31.532886623031324
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4393951145603716,
                "regionName": "Brookhaven, MS",
                "usdGrowth": 3797,
                "zhvi": 157625
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -124.15728202728464,
                    42.459113247596115
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.438983301302325,
                "regionName": "Brookings, OR",
                "usdGrowth": 15876,
                "zhvi": 468064.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.79079944806448,
                    44.36974375493766
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.389960501535782,
                "regionName": "Brookings, SD",
                "usdGrowth": 6474,
                "zhvi": 273529
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.48140372490866,
                    26.145242210600554
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.021354507096477,
                "regionName": "Brownsville, TX",
                "usdGrowth": 8626,
                "zhvi": 174599.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.99907113180583,
                    31.774303564569742
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.75690324157501,
                "regionName": "Brownwood, TX",
                "usdGrowth": 6492,
                "zhvi": 175941.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.63118125204255,
                    31.310977761264876
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.290607926184804,
                "regionName": "Brunswick, GA",
                "usdGrowth": 9530,
                "zhvi": 294094.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.91989098929871,
                    40.85065155738959
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8503965000597113,
                "regionName": "Bucyrus, OH",
                "usdGrowth": 3424,
                "zhvi": 121523.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.73641442587417,
                    42.90965193516143
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.0241727989707006,
                "regionName": "Buffalo, NY",
                "usdGrowth": -62,
                "zhvi": 245018.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -113.60909877452256,
                    42.41375116825841
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9950617317032844,
                "regionName": "Burley, ID",
                "usdGrowth": 9066,
                "zhvi": 306552
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.06053759001962,
                    40.872127894095186
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7897989769401055,
                "regionName": "Burlington, IA",
                "usdGrowth": 2331,
                "zhvi": 131129
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.39976137086515,
                    36.04347010229185
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0913395835615027,
                "regionName": "Burlington, NC",
                "usdGrowth": 8244,
                "zhvi": 270070.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.03088089337906,
                    44.6876872956721
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8258438261229752,
                "regionName": "Burlington, VT",
                "usdGrowth": 12039,
                "zhvi": 429808
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.66200917135642,
                    45.900189333032245
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9416340252150945,
                "regionName": "Butte, MT",
                "usdGrowth": 9281,
                "zhvi": 239225.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.3353430878394,
                    44.338131059360684
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.755871646996024,
                "regionName": "Cadillac, MI",
                "usdGrowth": 4790,
                "zhvi": 175601
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.87296252544951,
                    34.50487351097537
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3274313603565355,
                "regionName": "Calhoun, GA",
                "usdGrowth": 7328,
                "zhvi": 224019.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.60629279761176,
                    38.30058421779036
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.0094339125397722,
                "regionName": "California, MD",
                "usdGrowth": 3871,
                "zhvi": 384537.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.0275242601448,
                    38.454135215121816
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1607121744080326,
                "regionName": "Cambridge, MD",
                "usdGrowth": 6468,
                "zhvi": 207071.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.49248904822801,
                    40.050265285786686
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.186852803651461,
                "regionName": "Cambridge, OH",
                "usdGrowth": 1755,
                "zhvi": 148303.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.70580917577813,
                    33.57364614878444
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5404463122277232,
                "regionName": "Camden, AR",
                "usdGrowth": 1132,
                "zhvi": 73783
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.33299310443621,
                    37.36775620406978
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.325243584142372,
                "regionName": "Campbellsville, KY",
                "usdGrowth": 3359,
                "zhvi": 145616.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.4399667045503,
                    38.473623257044686
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0197295068524603,
                "regionName": "Canon City, CO",
                "usdGrowth": 6724,
                "zhvi": 335198.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.25293828822909,
                    40.718407113657605
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.1594896540178488,
                "regionName": "Canton, OH",
                "usdGrowth": 2159,
                "zhvi": 187178.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.88399312750133,
                    26.584103483785395
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8186591125789542,
                "regionName": "Cape Coral, FL",
                "usdGrowth": 3472,
                "zhvi": 427229.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.76867940848068,
                    37.32393868524425
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.25080323369189,
                "regionName": "Cape Girardeau, MO",
                "usdGrowth": 2653,
                "zhvi": 213648
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.18982724797992,
                    37.76228589387802
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9408702892201743,
                "regionName": "Carbondale, IL",
                "usdGrowth": 3832,
                "zhvi": 131834
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.74802188094075,
                    39.155090449711366
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.2993990330344696,
                "regionName": "Carson City, NV",
                "usdGrowth": -11339,
                "zhvi": 487386.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.79788502396956,
                    42.96180147653325
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.848256259308862,
                "regionName": "Casper, WY",
                "usdGrowth": 5126,
                "zhvi": 280855.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -113.2897380936825,
                    37.85903620232788
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.5226373012401115,
                "regionName": "Cedar City, UT",
                "usdGrowth": 18489,
                "zhvi": 416773.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.63142504685864,
                    42.091532793657024
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8945119328113844,
                "regionName": "Cedar Rapids, IA",
                "usdGrowth": 1851,
                "zhvi": 207546.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.18677780605171,
                    34.00267074034773
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9604335063715044,
                "regionName": "Cedartown, GA",
                "usdGrowth": 6903,
                "zhvi": 177487.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.62912741918763,
                    40.54043046427386
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.523253784503571,
                "regionName": "Celina, OH",
                "usdGrowth": 5821,
                "zhvi": 233162.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.39257687597888,
                    46.57756475843542
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3360423985579875,
                "regionName": "Centralia, WA",
                "usdGrowth": 9183,
                "zhvi": 395788
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.72157790780949,
                    39.92956518216587
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5111866450902638,
                "regionName": "Chambersburg, PA",
                "usdGrowth": 3710,
                "zhvi": 247235
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.29761995031556,
                    40.22621594507459
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6604468975241338,
                "regionName": "Champaign, IL",
                "usdGrowth": 3062,
                "zhvi": 185811.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.2303419054777,
                    39.41928480773636
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.709750835790591,
                "regionName": "Charleston, IL",
                "usdGrowth": 2809,
                "zhvi": 104640
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.04502206106504,
                    33.03511682325277
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4780282552093618,
                "regionName": "Charleston, SC",
                "usdGrowth": 10251,
                "zhvi": 418546.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.48966268979277,
                    38.26949024521422
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.008330995434286,
                "regionName": "Charleston, WV",
                "usdGrowth": 2534,
                "zhvi": 126781.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.86567878785223,
                    35.18912834624509
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.493037922251114,
                "regionName": "Charlotte, NC",
                "usdGrowth": 5735,
                "zhvi": 387274
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.57355083989852,
                    37.85157988677138
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.245845298493375,
                "regionName": "Charlottesville, VA",
                "usdGrowth": 9175,
                "zhvi": 411677.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.35906965216985,
                    35.048884739722624
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.640455394975504,
                "regionName": "Chattanooga, TN",
                "usdGrowth": 7292,
                "zhvi": 278937.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -104.68874970140844,
                    41.30702520515446
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9392521900526084,
                "regionName": "Cheyenne, WY",
                "usdGrowth": 3454,
                "zhvi": 370870.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.96198062423504,
                    41.702734678130504
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7950768215259079,
                "regionName": "Chicago, IL",
                "usdGrowth": 2454,
                "zhvi": 310298
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.60052515833401,
                    39.66727761702222
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.044659652029773844,
                "regionName": "Chico, CA",
                "usdGrowth": 181,
                "zhvi": 416076.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.06000913622717,
                    39.337053912657865
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2594181688755284,
                "regionName": "Chillicothe, OH",
                "usdGrowth": 4030,
                "zhvi": 180037.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.42702359846058,
                    39.07210986296301
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8341230277574324,
                "regionName": "Cincinnati, OH",
                "usdGrowth": 2181,
                "zhvi": 262332.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.4332955390268,
                    39.28957916753551
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.402044190644082,
                "regionName": "Clarksburg, WV",
                "usdGrowth": 1896,
                "zhvi": 135809.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.56404324780483,
                    36.7474777729416
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.5859446037458884,
                "regionName": "Clarksville, TN",
                "usdGrowth": 9746,
                "zhvi": 275542.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.75362441856542,
                    39.101242978607495
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.15221609250231405,
                "regionName": "Clearlake, CA",
                "usdGrowth": -567,
                "zhvi": 353932
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.68393091006735,
                    41.375493147927536
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.3579518490382019,
                "regionName": "Cleveland, OH",
                "usdGrowth": 2944,
                "zhvi": 218125.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.6645530702516,
                    35.13738826291356
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.8185478169628886,
                "regionName": "Cleveland, TN",
                "usdGrowth": 10027,
                "zhvi": 267245.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.16469006379275,
                    26.55386944879668
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.093862040258879,
                "regionName": "Clewiston, FL",
                "usdGrowth": 11159,
                "zhvi": 223802.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.53275096148508,
                    41.899816327269036
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.517555223816147,
                "regionName": "Clinton, IA",
                "usdGrowth": 7738,
                "zhvi": 174705
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.34688755038904,
                    34.574210769644516
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0797965520915755,
                "regionName": "Clovis, NM",
                "usdGrowth": 4136,
                "zhvi": 200612.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -116.70208723860554,
                    47.672822575843384
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.0499770219003355,
                "regionName": "Coeur d'Alene, ID",
                "usdGrowth": -17793,
                "zhvi": 573002.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.74329257552557,
                    37.19236567659062
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0574003219924775,
                "regionName": "Coffeyville, KS",
                "usdGrowth": 2328,
                "zhvi": 77141.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.05929475749143,
                    41.91600556434608
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5982627525875452,
                "regionName": "Coldwater, MI",
                "usdGrowth": 4500,
                "zhvi": 175046.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.49100664985815,
                    30.757264151115702
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.7467236275645304,
                "regionName": "College Station, TX",
                "usdGrowth": 10417,
                "zhvi": 282074.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -104.65854121128916,
                    38.84265963343982
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.9593216323562948,
                "regionName": "Colorado Springs, CO",
                "usdGrowth": -9626,
                "zhvi": 488893.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.30723574592804,
                    38.99186228804445
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.0457544094592184,
                "regionName": "Columbia, MO",
                "usdGrowth": 2820,
                "zhvi": 270665.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.04100712021041,
                    34.090776695627724
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.967773408102887,
                "regionName": "Columbia, SC",
                "usdGrowth": 7004,
                "zhvi": 238827
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.907991095591,
                    32.440091526631996
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7322538594524373,
                "regionName": "Columbus, GA",
                "usdGrowth": 4636,
                "zhvi": 171507
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.89558180788903,
                    39.20744865120985
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4596787128719617,
                "regionName": "Columbus, IN",
                "usdGrowth": 5734,
                "zhvi": 235040.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.44191530456325,
                    33.47386518146212
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0548177265291163,
                "regionName": "Columbus, MS",
                "usdGrowth": 3206,
                "zhvi": 157357.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.52144358517788,
                    41.572468362930586
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7492402739437165,
                "regionName": "Columbus, NE",
                "usdGrowth": 6841,
                "zhvi": 251373.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.83668717693679,
                    39.9675245102146
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.133864253228804,
                "regionName": "Columbus, OH",
                "usdGrowth": 6384,
                "zhvi": 301631.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -71.68115729940197,
                    43.296629705699694
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2358036432093207,
                "regionName": "Concord, NH",
                "usdGrowth": 13023,
                "zhvi": 406959.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.17797540731071,
                    39.63684961948381
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.456866427813189,
                "regionName": "Connersville, IN",
                "usdGrowth": 2988,
                "zhvi": 122975.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.47111834015014,
                    36.275353338190094
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.095478156612747,
                "regionName": "Cookeville, TN",
                "usdGrowth": 10588,
                "zhvi": 262803.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -124.05945138661293,
                    43.17406868367693
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1475396443720363,
                "regionName": "Coos Bay, OR",
                "usdGrowth": 7928,
                "zhvi": 372600.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.7681184270237,
                    31.92289564655159
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7656501762877093,
                "regionName": "Cordele, GA",
                "usdGrowth": 3843,
                "zhvi": 140716.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.57996173361923,
                    34.88084463467882
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.872984833381498,
                "regionName": "Corinth, MS",
                "usdGrowth": 3788,
                "zhvi": 133387.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.53094677138867,
                    34.63331565805727
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.781135624275218,
                "regionName": "Cornelia, GA",
                "usdGrowth": 8266,
                "zhvi": 221727.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.382992395601,
                    42.26891439778896
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.993833761751585,
                "regionName": "Corning, NY",
                "usdGrowth": 7296,
                "zhvi": 149686.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.42487495508635,
                    27.896293986966537
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4591414864538124,
                "regionName": "Corpus Christi, TX",
                "usdGrowth": 3216,
                "zhvi": 222414.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.47428766322207,
                    32.046206811581484
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.800981675958201,
                "regionName": "Corsicana, TX",
                "usdGrowth": 8181,
                "zhvi": 173933
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.07048931345551,
                    42.59509207351303
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7391114140832016,
                "regionName": "Cortland, NY",
                "usdGrowth": 2960,
                "zhvi": 171213.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.4316986739362,
                    44.49167305936759
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8260751204181945,
                "regionName": "Corvallis, OR",
                "usdGrowth": 4313,
                "zhvi": 525290.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.91729018355574,
                    40.30096165837762
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.874995694643685,
                "regionName": "Coshocton, OH",
                "usdGrowth": 4565,
                "zhvi": 160678.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.20708757745848,
                    40.61810998619257
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.311819960685696,
                "regionName": "Craig, CO",
                "usdGrowth": 12140,
                "zhvi": 286664.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.8933502352541,
                    40.04034822765975
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6157749204372602,
                "regionName": "Crawfordsville, IN",
                "usdGrowth": 4935,
                "zhvi": 190633
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.89740629566386,
                    41.74228275475753
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.4600891844260797,
                "regionName": "Crescent City, CA",
                "usdGrowth": 12826,
                "zhvi": 375140.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.36490133154936,
                    30.66485536214169
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.309188265059878,
                "regionName": "Crestview, FL",
                "usdGrowth": 10163,
                "zhvi": 445400
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.99840585085171,
                    35.952717206535986
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.930491865713661,
                "regionName": "Crossville, TN",
                "usdGrowth": 5382,
                "zhvi": 280503.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.8688803745171,
                    34.13020302865632
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4063684978773043,
                "regionName": "Cullman, AL",
                "usdGrowth": 4994,
                "zhvi": 209694.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.1409338489825,
                    35.28814273139323
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.311681129429457,
                "regionName": "Cullowhee, NC",
                "usdGrowth": 16401,
                "zhvi": 387303
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.80189163106192,
                    39.53219148878753
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.056160452155478,
                "regionName": "Cumberland, MD",
                "usdGrowth": -1369,
                "zhvi": 128441.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.02517047765379,
                    32.818182882900125
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.1124001321064379,
                "regionName": "Dallas, TX",
                "usdGrowth": -449,
                "zhvi": 391047.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.8480536953453,
                    34.79869443898867
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.034508983424303,
                "regionName": "Dalton, GA",
                "usdGrowth": 8638,
                "zhvi": 217395.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.73384359401574,
                    40.18417170639384
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.245545651886296,
                "regionName": "Danville, IL",
                "usdGrowth": 1973,
                "zhvi": 88673
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.73288121574376,
                    37.51826264737871
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3977667668705767,
                "regionName": "Danville, KY",
                "usdGrowth": 3945,
                "zhvi": 166006.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.39758933981331,
                    36.80982567205635
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.776224514465314,
                "regionName": "Danville, VA",
                "usdGrowth": 4637,
                "zhvi": 168997.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.72207057608028,
                    30.727749910967898
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.032367785229935,
                "regionName": "Daphne, AL",
                "usdGrowth": 11011,
                "zhvi": 366996.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.46707345008396,
                    41.39761850514145
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7081179858130735,
                "regionName": "Davenport, IA",
                "usdGrowth": 1143,
                "zhvi": 161937.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.14264696433703,
                    39.829732742559315
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.0199414411053778,
                "regionName": "Dayton, OH",
                "usdGrowth": 1934,
                "zhvi": 190388
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.93076643098496,
                    35.60536161319089
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.6858254093842655,
                "regionName": "Dayton, TN",
                "usdGrowth": 8159,
                "zhvi": 225017
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.34173615832168,
                    30.64836517717465
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5718218002896391,
                "regionName": "DeRidder, LA",
                "usdGrowth": 2162,
                "zhvi": 139074.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.10087852952766,
                    34.490314482096565
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9260777275344734,
                "regionName": "Decatur, AL",
                "usdGrowth": 7908,
                "zhvi": 203984
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.96342505259047,
                    39.8606491330259
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7363666182321686,
                "regionName": "Decatur, IL",
                "usdGrowth": 1978,
                "zhvi": 114785
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.93671405853009,
                    40.74576530101685
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4337491012341936,
                "regionName": "Decatur, IN",
                "usdGrowth": 4942,
                "zhvi": 204911.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.49076944483588,
                    41.32398837368299
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7315654663217424,
                "regionName": "Defiance, OH",
                "usdGrowth": 4650,
                "zhvi": 172093.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.15252045100806,
                    29.8914923180939
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.5335722545325936,
                "regionName": "Del Rio, TX",
                "usdGrowth": 6309,
                "zhvi": 181275.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.22050707476632,
                    29.17318096903595
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9133512622854636,
                "regionName": "Deltona, FL",
                "usdGrowth": 6851,
                "zhvi": 361814.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -107.75088263915336,
                    32.181793405602484
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0197438875670497,
                "regionName": "Deming, NM",
                "usdGrowth": 3059,
                "zhvi": 152709
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -104.89550761604877,
                    39.43446813513861
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.2218074159466026,
                "regionName": "Denver, CO",
                "usdGrowth": -14040,
                "zhvi": 626852
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.94111848201818,
                    41.54781701065186
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9273668340372883,
                "regionName": "Des Moines, IA",
                "usdGrowth": 5112,
                "zhvi": 267028.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.22849722888866,
                    42.71733967824494
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.3426329671685068,
                "regionName": "Detroit, MI",
                "usdGrowth": -820,
                "zhvi": 239118.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -102.6576326328232,
                    46.80851182026135
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8370176383246051,
                "regionName": "Dickinson, ND",
                "usdGrowth": 2537,
                "zhvi": 303890.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.29977131720565,
                    41.74583951235152
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.043878958119403,
                "regionName": "Dixon, IL",
                "usdGrowth": 2674,
                "zhvi": 131924.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.88825297869995,
                    37.69200114082789
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9451588064580463,
                "regionName": "Dodge City, KS",
                "usdGrowth": 6106,
                "zhvi": 157156.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.45916220703745,
                    31.251104059136125
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.6329918938389265,
                "regionName": "Dothan, AL",
                "usdGrowth": 6050,
                "zhvi": 168600.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.85492059532523,
                    31.548929655371953
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9346085709600005,
                "regionName": "Douglas, GA",
                "usdGrowth": 4459,
                "zhvi": 153984.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.56884913750551,
                    39.08646627602707
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.03935407516156,
                "regionName": "Dover, DE",
                "usdGrowth": 6624,
                "zhvi": 327334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.47592663471656,
                    41.00110781695726
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8837217837193583,
                "regionName": "DuBois, PA",
                "usdGrowth": 3857,
                "zhvi": 135180.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.85054636914306,
                    32.52895386774624
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.219515418097591,
                "regionName": "Dublin, GA",
                "usdGrowth": 4916,
                "zhvi": 155152
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.88181925137718,
                    42.46815349485678
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9980351853901817,
                "regionName": "Dubuque, IA",
                "usdGrowth": 7189,
                "zhvi": 243211.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.40752015297224,
                    47.335871472587655
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.700515629728231,
                "regionName": "Duluth, MN",
                "usdGrowth": 3956,
                "zhvi": 234458.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.89302811911725,
                    35.837692416561104
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.104875710055196,
                "regionName": "Dumas, TX",
                "usdGrowth": 5480,
                "zhvi": 178772.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.85141891781991,
                    34.48556989379415
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.207044481895689,
                "regionName": "Duncan, OK",
                "usdGrowth": 3716,
                "zhvi": 117590
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -107.84290143896249,
                    37.28632032165822
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8361464024087482,
                "regionName": "Durango, CO",
                "usdGrowth": 12225,
                "zhvi": 675386
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.25903472409088,
                    33.964724583171986
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.988939635371204,
                "regionName": "Durant, OK",
                "usdGrowth": 6705,
                "zhvi": 171093.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.09934112606935,
                    35.992394063314784
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.3165260357937135,
                "regionName": "Durham, NC",
                "usdGrowth": 1337,
                "zhvi": 431709
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.41542854620951,
                    36.05931946488051
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1199789400271336,
                "regionName": "Dyersburg, TN",
                "usdGrowth": 4389,
                "zhvi": 142755
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.31576865003989,
                    28.74291950440887
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2133322852654564,
                "regionName": "Eagle Pass, TX",
                "usdGrowth": 6245,
                "zhvi": 197106.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.34031025037544,
                    41.05934057613904
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2044743790086867,
                "regionName": "East Stroudsburg, PA",
                "usdGrowth": 3553,
                "zhvi": 296927.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.10882560970072,
                    38.766181594135716
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.009893694509671,
                "regionName": "Easton, MD",
                "usdGrowth": 8808,
                "zhvi": 441912
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.28273942822628,
                    44.93929019708735
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.002016469823201,
                "regionName": "Eau Claire, WI",
                "usdGrowth": 7895,
                "zhvi": 265805.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.69336371034929,
                    39.62754308332399
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.578449619069726,
                "regionName": "Edwards, CO",
                "usdGrowth": 56840,
                "zhvi": 1267266.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.58969584292112,
                    39.05935710940891
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2473280130155624,
                "regionName": "Effingham, IL",
                "usdGrowth": 4379,
                "zhvi": 196705
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.22319248239627,
                    29.27765923199832
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.544345487196477,
                "regionName": "El Campo, TX",
                "usdGrowth": 7303,
                "zhvi": 209009.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -115.36690421063538,
                    33.03930819775538
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 6.819703747444471,
                "regionName": "El Centro, CA",
                "usdGrowth": 22347,
                "zhvi": 336562.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.59746952170292,
                    33.16887091477757
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8869082412217153,
                "regionName": "El Dorado, AR",
                "usdGrowth": 2054,
                "zhvi": 109520
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.54228342869824,
                    31.513249866111817
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.793007381444936,
                "regionName": "El Paso, TX",
                "usdGrowth": 5492,
                "zhvi": 198824.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.27315745670045,
                    36.26022816786907
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.009015609453893,
                "regionName": "Elizabeth City, NC",
                "usdGrowth": 9809,
                "zhvi": 248837.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.97190365248518,
                    37.734153993613745
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5569559244107176,
                "regionName": "Elizabethtown, KY",
                "usdGrowth": 5599,
                "zhvi": 220698.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.68128022523018,
                    35.26862448892281
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.174804188871226,
                "regionName": "Elk City, OK",
                "usdGrowth": 3080,
                "zhvi": 143266.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.85875694989767,
                    41.59761169058054
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.1941735934679134,
                "regionName": "Elkhart, IN",
                "usdGrowth": 454,
                "zhvi": 235072
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.87919614765731,
                    38.76989900430667
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.3728653765490524,
                "regionName": "Elkins, WV",
                "usdGrowth": 1628,
                "zhvi": 119315.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -115.53415846108021,
                    40.919762345029625
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.568298519536866,
                "regionName": "Elko, NV",
                "usdGrowth": 10117,
                "zhvi": 397876.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.67943897161696,
                    47.125212138656785
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.997962295757302,
                "regionName": "Ellensburg, WA",
                "usdGrowth": 16302,
                "zhvi": 552559.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.76388049978566,
                    42.13891055920874
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8199353189637055,
                "regionName": "Elmira, NY",
                "usdGrowth": 2444,
                "zhvi": 135177.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.15275714902437,
                    38.4557615640978
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.8289367981479803,
                "regionName": "Emporia, KS",
                "usdGrowth": 5529,
                "zhvi": 146578.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.7826551700161,
                    36.3791333964897
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.379613436198778,
                "regionName": "Enid, OK",
                "usdGrowth": 3696,
                "zhvi": 110929.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.98901039044345,
                    31.399328258462386
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9975301252308728,
                "regionName": "Enterprise, AL",
                "usdGrowth": 3482,
                "zhvi": 175761.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.03301953577146,
                    41.992538292906275
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.243497801887458,
                "regionName": "Erie, PA",
                "usdGrowth": 4026,
                "zhvi": 180855
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.90807449548132,
                    45.904849098003034
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.662429557816848,
                "regionName": "Escanaba, MI",
                "usdGrowth": 3854,
                "zhvi": 146115
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.69316742409141,
                    36.510721369168884
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.220768486823278,
                "regionName": "Espanola, NM",
                "usdGrowth": 5198,
                "zhvi": 236361
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.84775295780756,
                    43.9372703534046
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.17097699085294785,
                "regionName": "Eugene, OR",
                "usdGrowth": 787,
                "zhvi": 462309
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.87604399345537,
                    40.699230085067526
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8935276414861977,
                "regionName": "Eureka, CA",
                "usdGrowth": 9183,
                "zhvi": 489693.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -110.54757824527395,
                    41.287818299130244
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9219341111181585,
                "regionName": "Evanston, WY",
                "usdGrowth": 5397,
                "zhvi": 282754.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.57725779281813,
                    37.969719150493134
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9031107749008657,
                "regionName": "Evansville, IN",
                "usdGrowth": 1739,
                "zhvi": 193095.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -146.5692661578299,
                    64.80726246686676
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.499067718335744,
                "regionName": "Fairbanks, AK",
                "usdGrowth": -6607,
                "zhvi": 186735.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.94849465507143,
                    41.03192394327859
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4698513405178282,
                "regionName": "Fairfield, IA",
                "usdGrowth": 2295,
                "zhvi": 157074
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.24244658913575,
                    39.50984542325685
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5066775531399168,
                "regionName": "Fairmont, WV",
                "usdGrowth": 2138,
                "zhvi": 142577
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -118.33946071872921,
                    39.58105743555013
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7516996318233273,
                "regionName": "Fallon, NV",
                "usdGrowth": 10325,
                "zhvi": 379031.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.96115178352652,
                    46.917372289632205
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5797750676042195,
                "regionName": "Fargo, ND",
                "usdGrowth": 4435,
                "zhvi": 282676
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.2965871516082,
                    44.3543375988542
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.6947788723441075,
                "regionName": "Faribault, MN",
                "usdGrowth": 2235,
                "zhvi": 322510.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.47598685432207,
                    37.81214171295678
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.577206984708023,
                "regionName": "Farmington, MO",
                "usdGrowth": 6356,
                "zhvi": 180012.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.3204370047621,
                    36.5083831800973
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.4468871368543788,
                "regionName": "Farmington, NM",
                "usdGrowth": 7195,
                "zhvi": 211869.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.12162247850559,
                    36.19582040804017
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3324824578259333,
                "regionName": "Fayetteville, AR",
                "usdGrowth": 10347,
                "zhvi": 314497
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.98138336098829,
                    35.036753774345776
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.64979801607907,
                "regionName": "Fayetteville, NC",
                "usdGrowth": 9053,
                "zhvi": 197999.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.70835254803137,
                    46.40846928545725
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.874417071767776,
                "regionName": "Fergus Falls, MN",
                "usdGrowth": 9139,
                "zhvi": 321412
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.18704786276741,
                    39.01777974278899
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.906111004981147,
                "regionName": "Fernley, NV",
                "usdGrowth": -11986,
                "zhvi": 408909.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.66838947752707,
                    41.002504869336356
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3823122585140073,
                "regionName": "Findlay, OH",
                "usdGrowth": 4849,
                "zhvi": 205226.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.22145359010625,
                    31.76095873669971
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.257547721386842,
                "regionName": "Fitzgerald, GA",
                "usdGrowth": 2504,
                "zhvi": 112163
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -111.77071784166408,
                    35.838834291930986
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.9348617482045507,
                "regionName": "Flagstaff, AZ",
                "usdGrowth": -5872,
                "zhvi": 626563
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.70589709216853,
                    43.02244215102666
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8487892323651969,
                "regionName": "Flint, MI",
                "usdGrowth": 1467,
                "zhvi": 173171.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.72345409515994,
                    34.807799820939216
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9196329570539037,
                "regionName": "Florence, AL",
                "usdGrowth": 6695,
                "zhvi": 172985.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.80795951824378,
                    34.15085933932116
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3793905652563767,
                "regionName": "Florence, SC",
                "usdGrowth": 5700,
                "zhvi": 170830
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.48885324915454,
                    43.753549076649264
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.345546941603536,
                "regionName": "Fond du Lac, WI",
                "usdGrowth": 4522,
                "zhvi": 194517
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.92112098731282,
                    35.40114178405278
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.617641558989659,
                "regionName": "Forest City, NC",
                "usdGrowth": 9696,
                "zhvi": 213981
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.74828138254959,
                    35.022019754897734
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8394862418651048,
                "regionName": "Forrest City, AR",
                "usdGrowth": 1308,
                "zhvi": 71505.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.46257841635773,
                    40.6667159688629
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.1576169484060541,
                "regionName": "Fort Collins, CO",
                "usdGrowth": -6635,
                "zhvi": 570963
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.20783203260667,
                    37.824620751272455
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1265483957309272,
                "regionName": "Fort Leonard Wood, MO",
                "usdGrowth": 4141,
                "zhvi": 196765.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.4135349629521,
                    40.47356893595157
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9917459183627502,
                "regionName": "Fort Madison, IA",
                "usdGrowth": 2315,
                "zhvi": 117132.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.80933017922906,
                    40.262798098644545
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.048127786498612,
                "regionName": "Fort Morgan, CO",
                "usdGrowth": 13504,
                "zhvi": 339493.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.18153838252131,
                    31.108848367080377
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9389850846736965,
                "regionName": "Fort Polk South, LA",
                "usdGrowth": 2348,
                "zhvi": 122306
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.56569393321315,
                    35.19084161090239
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0474032308595453,
                "regionName": "Fort Smith, AR",
                "usdGrowth": 3066,
                "zhvi": 151040.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.21644322293047,
                    41.00545235305935
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.0938405936364761,
                "regionName": "Fort Wayne, IN",
                "usdGrowth": 2323,
                "zhvi": 213202.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.47277256930988,
                    40.30319753764487
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6336392188170876,
                "regionName": "Frankfort, IN",
                "usdGrowth": 4318,
                "zhvi": 165669
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.93276807235395,
                    38.128313895893776
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0098664908858996,
                "regionName": "Frankfort, KY",
                "usdGrowth": 6290,
                "zhvi": 211284.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.94676914735993,
                    30.31824094624229
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.2133505848144015,
                "regionName": "Fredericksburg, TX",
                "usdGrowth": 23015,
                "zhvi": 557263.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.66259799832086,
                    42.35129217389304
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0891249915018406,
                "regionName": "Freeport, IL",
                "usdGrowth": 2449,
                "zhvi": 118287
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.65598178684372,
                    41.58071748087161
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4908502368647065,
                "regionName": "Fremont, NE",
                "usdGrowth": 5109,
                "zhvi": 207284.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.13787199638801,
                    41.35624125776656
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2326643555298418,
                "regionName": "Fremont, OH",
                "usdGrowth": 2046,
                "zhvi": 167019.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.6466953354348,
                    36.757338990694706
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.32874323850271636,
                "regionName": "Fresno, CA",
                "usdGrowth": 1277,
                "zhvi": 391309
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.04051873361765,
                    34.045672660363266
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8450782396755487,
                "regionName": "Gadsden, AL",
                "usdGrowth": 2605,
                "zhvi": 142213.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.61828621906531,
                    35.05122251432655
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.229217474349329,
                "regionName": "Gaffney, SC",
                "usdGrowth": 5348,
                "zhvi": 128673
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.4795801998601,
                    29.69232419185893
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.414203603378972,
                "regionName": "Gainesville, FL",
                "usdGrowth": 9780,
                "zhvi": 289995
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.81896935582849,
                    34.32207822912503
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.060905926342036,
                "regionName": "Gainesville, GA",
                "usdGrowth": 7772,
                "zhvi": 380494.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.21240911834019,
                    33.63979567471472
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.7392762837120355,
                "regionName": "Gainesville, TX",
                "usdGrowth": 13457,
                "zhvi": 289456
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.21330340194551,
                    40.93148779370358
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.198612567601749,
                "regionName": "Galesburg, IL",
                "usdGrowth": 1165,
                "zhvi": 97778
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.26224499469379,
                    35.580077198877134
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5048694469695736,
                "regionName": "Gallup, NM",
                "usdGrowth": 3225,
                "zhvi": 215513
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.97161836719114,
                    38.02611178684806
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.227808148663802,
                "regionName": "Garden City, KS",
                "usdGrowth": 7408,
                "zhvi": 232775.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.61713332961942,
                    38.91286200447176
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.8143819827763434,
                "regionName": "Gardnerville Ranchos, NV",
                "usdGrowth": -20129,
                "zhvi": 707597.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.33202141172893,
                    33.4344334192096
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.48350734971939,
                "regionName": "Georgetown, SC",
                "usdGrowth": 19719,
                "zhvi": 368625.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.21610346992492,
                    39.87140411339953
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.223273547200158,
                "regionName": "Gettysburg, PA",
                "usdGrowth": 6236,
                "zhvi": 283288
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.5474404137403,
                    44.24886082356416
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2605804470691586,
                "regionName": "Gillette, WY",
                "usdGrowth": 4161,
                "zhvi": 331795.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.82531900855824,
                    36.975390714454726
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1477319751285524,
                "regionName": "Glasgow, KY",
                "usdGrowth": 3530,
                "zhvi": 165658
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.65031937349066,
                    43.4447634043654
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.911847352344382,
                "regionName": "Glens Falls, NY",
                "usdGrowth": 4975,
                "zhvi": 262075
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -107.66476406062165,
                    39.50567238923517
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.439302357770434,
                "regionName": "Glenwood Springs, CO",
                "usdGrowth": 19633,
                "zhvi": 818533.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -74.41798803498781,
                    43.11363906520248
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.490748287012439,
                "regionName": "Gloversville, NY",
                "usdGrowth": 4129,
                "zhvi": 167284.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.0002726817806,
                    35.364381253615214
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.951409643423778,
                "regionName": "Goldsboro, NC",
                "usdGrowth": 7755,
                "zhvi": 199387.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.84259063221887,
                    47.835402307566525
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8908307139713916,
                "regionName": "Grand Forks, ND",
                "usdGrowth": 4799,
                "zhvi": 255735
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.27876039595388,
                    41.03278841667481
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3192531196556985,
                "regionName": "Grand Island, NE",
                "usdGrowth": 5131,
                "zhvi": 223304.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.46979902814422,
                    39.01787887616741
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.2647314416387942,
                "regionName": "Grand Junction, CO",
                "usdGrowth": 1038,
                "zhvi": 394198
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.48844277836227,
                    42.99881041017452
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.708076755376948,
                "regionName": "Grand Rapids, MI",
                "usdGrowth": 2165,
                "zhvi": 307053
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.5561937750019,
                    42.3665548962671
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.0448951762127647,
                "regionName": "Grants Pass, OR",
                "usdGrowth": -12170,
                "zhvi": 396428.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.75636725513971,
                    38.47889676055778
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.4970481044748616,
                "regionName": "Great Bend, KS",
                "usdGrowth": 3545,
                "zhvi": 102815.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -111.34679219413526,
                    47.30797024439643
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8895898023508484,
                "regionName": "Great Falls, MT",
                "usdGrowth": 5580,
                "zhvi": 297973.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -104.39296210666143,
                    40.55499404576312
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.5154305436956902,
                "regionName": "Greeley, CO",
                "usdGrowth": -2760,
                "zhvi": 534697.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.07736285035925,
                    44.77530535173627
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4392943256554445,
                "regionName": "Green Bay, WI",
                "usdGrowth": 3652,
                "zhvi": 255463
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.84691272746419,
                    36.174701251066
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0885195109504022,
                "regionName": "Greeneville, TN",
                "usdGrowth": 4058,
                "zhvi": 195900.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.79128573239676,
                    36.02581774944882
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0354059324574374,
                "regionName": "Greensboro, NC",
                "usdGrowth": 7040,
                "zhvi": 234390.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.50087166255017,
                    39.30712657766117
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1530115687424907,
                "regionName": "Greensburg, IN",
                "usdGrowth": 4595,
                "zhvi": 215338.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.37353177738498,
                    35.59535425701669
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.159610277307377,
                "regionName": "Greenville, NC",
                "usdGrowth": 6853,
                "zhvi": 219478
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.61945169709969,
                    40.13412966466746
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.956440779651653,
                "regionName": "Greenville, OH",
                "usdGrowth": 3705,
                "zhvi": 190665.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.4161607995903,
                    34.685418528374136
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5367334842514446,
                "regionName": "Greenville, SC",
                "usdGrowth": 7700,
                "zhvi": 306930.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.10585822478659,
                    33.50087622422152
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9256284881510823,
                "regionName": "Greenwood, MS",
                "usdGrowth": 1830,
                "zhvi": 96102
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.30270456441859,
                    34.18977491943131
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.263879328787771,
                "regionName": "Greenwood, SC",
                "usdGrowth": -2121,
                "zhvi": 167132.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.80245083113672,
                    33.77036165846316
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.1786811622522069,
                "regionName": "Grenada, MS",
                "usdGrowth": 1399,
                "zhvi": 119618
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.02065438736449,
                    30.499403932819753
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6050251845852164,
                "regionName": "Gulfport, MS",
                "usdGrowth": 3181,
                "zhvi": 200299
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.48897647835743,
                    36.747776354770906
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.276723675101758,
                "regionName": "Guymon, OK",
                "usdGrowth": 6128,
                "zhvi": 146456.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.90646486914211,
                    39.54851526070304
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.12453165876663,
                "regionName": "Hagerstown, MD",
                "usdGrowth": 6022,
                "zhvi": 286429.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -114.1974206420128,
                    43.32226183732356
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.715811240436024,
                "regionName": "Hailey, ID",
                "usdGrowth": 31821,
                "zhvi": 867996.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.40664995754759,
                    30.62888672717611
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8630499827993992,
                "regionName": "Hammond, LA",
                "usdGrowth": 1817,
                "zhvi": 211141.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.8159973014743,
                    36.07409056416317
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6079164770992926,
                "regionName": "Hanford, CA",
                "usdGrowth": 5415,
                "zhvi": 340568.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.56757600349891,
                    39.6600395410873
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3936852598243776,
                "regionName": "Hannibal, MO",
                "usdGrowth": 5790,
                "zhvi": 173112
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.1007856650279,
                    40.32778414531953
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.092199587608099,
                "regionName": "Harrisburg, PA",
                "usdGrowth": 5385,
                "zhvi": 259203.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.16386434237164,
                    36.085595728180145
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.239762627452913,
                "regionName": "Harrison, AR",
                "usdGrowth": 3874,
                "zhvi": 174398
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.87266440639183,
                    38.5084071604063
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7983631941538456,
                "regionName": "Harrisonburg, VA",
                "usdGrowth": 8518,
                "zhvi": 308013
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -72.57539395183417,
                    41.73222888904245
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7948462034937557,
                "regionName": "Hartford, CT",
                "usdGrowth": 2539,
                "zhvi": 321153.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.50117803571513,
                    40.52449420184095
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0977564021077653,
                "regionName": "Hastings, NE",
                "usdGrowth": 3904,
                "zhvi": 187870.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.2286326458353,
                    31.187357265503053
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.254368059668407,
                "regionName": "Hattiesburg, MS",
                "usdGrowth": 4223,
                "zhvi": 189091
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.31751550598,
                    38.91458711552997
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5146721776238197,
                "regionName": "Hays, KS",
                "usdGrowth": 5497,
                "zhvi": 220567.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -111.16914186936418,
                    40.33110236089267
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.253037116182449,
                "regionName": "Heber, UT",
                "usdGrowth": 35307,
                "zhvi": 845821.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.84800153857124,
                    34.43268455107281
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8010583691049522,
                "regionName": "Helena, AR",
                "usdGrowth": 693,
                "zhvi": 38768.666666666664
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.29932369085518,
                    46.81580109218112
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3149701272299,
                "regionName": "Helena, MT",
                "usdGrowth": 10457,
                "zhvi": 455855.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.40670845394374,
                    36.36880673390952
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.469608417811648,
                "regionName": "Henderson, NC",
                "usdGrowth": 6028,
                "zhvi": 137535.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -102.60542672645916,
                    34.965229569788946
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.920132310005204,
                "regionName": "Hereford, TX",
                "usdGrowth": 4192,
                "zhvi": 145146
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.06429567039784,
                    45.5240058602454
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0055208647345664,
                "regionName": "Hermiston, OR",
                "usdGrowth": 5978,
                "zhvi": 300005.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.4559249739032,
                    35.81390982371509
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.461764085567402,
                "regionName": "Hickory, NC",
                "usdGrowth": 8150,
                "zhvi": 239009.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.59312018766626,
                    41.8875363883461
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.44245144394748,
                "regionName": "Hillsdale, MI",
                "usdGrowth": 4748,
                "zhvi": 196234.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -155.5210166904976,
                    19.60121156720921
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6147711054293803,
                "regionName": "Hilo, HI",
                "usdGrowth": 9604,
                "zhvi": 602049
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.87536069054283,
                    32.411968172552434
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7101151266981707,
                "regionName": "Hilton Head Island, SC",
                "usdGrowth": 13581,
                "zhvi": 508751.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.60241002416439,
                    31.794374343280854
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.921727809158107,
                "regionName": "Hinesville, GA",
                "usdGrowth": 9669,
                "zhvi": 199388.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.41237333373735,
                    32.792153608666375
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8146016135405225,
                "regionName": "Hobbs, NM",
                "usdGrowth": 4044,
                "zhvi": 224482.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.89102866451427,
                    42.5914703664056
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9744839349321734,
                "regionName": "Holland, MI",
                "usdGrowth": 5788,
                "zhvi": 295782.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.4761474826112,
                    28.84804314718566
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.191295155051472,
                "regionName": "Homosassa Springs, FL",
                "usdGrowth": 11790,
                "zhvi": 286287.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.6552035912912,
                    45.51872811074629
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.236215959972981,
                "regionName": "Hood River, OR",
                "usdGrowth": 21370,
                "zhvi": 668828
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.1492160362998,
                    34.57692074141712
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.347756509521101,
                "regionName": "Hot Springs, AR",
                "usdGrowth": 7874,
                "zhvi": 237760.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.52927161515133,
                    47.0228607867903
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.077031408568136,
                "regionName": "Houghton, MI",
                "usdGrowth": 5240,
                "zhvi": 172187.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.64666085602869,
                    29.43866784293357
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6302238600909402,
                "regionName": "Houma, LA",
                "usdGrowth": 3075,
                "zhvi": 190278.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.36936053891156,
                    29.770136686764282
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.3529756593206366,
                "regionName": "Houston, TX",
                "usdGrowth": 4199,
                "zhvi": 312804.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.63089094653627,
                    42.248193478765394
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.3255144414506708,
                "regionName": "Hudson, NY",
                "usdGrowth": 5047,
                "zhvi": 382037
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.97673273262282,
                    40.42162652228604
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3779043937736675,
                "regionName": "Huntingdon, PA",
                "usdGrowth": 4036,
                "zhvi": 171302.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.48822091734341,
                    40.829072730974346
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5436287399148183,
                "regionName": "Huntington, IN",
                "usdGrowth": 4286,
                "zhvi": 170232.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.37547966464379,
                    38.38020602195227
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5386865292999978,
                "regionName": "Huntington, WV",
                "usdGrowth": 2067,
                "zhvi": 135093.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.73493978757799,
                    34.78397274146212
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.420504470324427,
                "regionName": "Huntsville, AL",
                "usdGrowth": 7371,
                "zhvi": 307407.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.3665187814719,
                    30.90459912737969
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.8245401572258215,
                "regionName": "Huntsville, TX",
                "usdGrowth": 9600,
                "zhvi": 254962.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.08607291711272,
                    37.95230263251467
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.20539257140828,
                "regionName": "Hutchinson, KS",
                "usdGrowth": 4321,
                "zhvi": 136605
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.27287017215642,
                    44.823676769658746
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.3658253642288957,
                "regionName": "Hutchinson, MN",
                "usdGrowth": 956,
                "zhvi": 263311.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.43299747390968,
                    43.62423060526754
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4268034372418803,
                "regionName": "Idaho Falls, ID",
                "usdGrowth": 5971,
                "zhvi": 422387.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.08963284884786,
                    40.652410407323366
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7728662586289636,
                "regionName": "Indiana, PA",
                "usdGrowth": 2841,
                "zhvi": 161489.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.20689853350115,
                    39.74683754956197
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8377432622035115,
                "regionName": "Indianapolis, IN",
                "usdGrowth": 4952,
                "zhvi": 271207
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.58882684258155,
                    33.601925784851936
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.136855383055765,
                "regionName": "Indianola, MS",
                "usdGrowth": 1817,
                "zhvi": 85828.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.64950278954277,
                    41.511241477272975
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8082972714059098,
                "regionName": "Iowa City, IA",
                "usdGrowth": 4949,
                "zhvi": 277879
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.07919268439919,
                    45.94639649514369
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.474580758296219,
                "regionName": "Iron Mountain, MI",
                "usdGrowth": 3962,
                "zhvi": 161672
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.47229843065283,
                    42.44945764559585
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.009790186695519,
                "regionName": "Ithaca, NY",
                "usdGrowth": 8908,
                "zhvi": 299612
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.42258681119974,
                    42.248070349240436
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.2665381509319297,
                "regionName": "Jackson, MI",
                "usdGrowth": 543,
                "zhvi": 204039
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.22148786520107,
                    32.317480166466964
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.3898197369992792,
                "regionName": "Jackson, MS",
                "usdGrowth": 728,
                "zhvi": 187088.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.61818560183286,
                    39.01914254323943
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.919132553565439,
                "regionName": "Jackson, OH",
                "usdGrowth": 3469,
                "zhvi": 120242
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.85006063585692,
                    35.609628247760845
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.93321422050642,
                "regionName": "Jackson, TN",
                "usdGrowth": 5421,
                "zhvi": 187617
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -110.64803710884708,
                    43.91780450373829
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9915741902472601,
                "regionName": "Jackson, WY",
                "usdGrowth": 21657,
                "zhvi": 1095050.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.79110010633035,
                    30.236451662681137
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6761607271844,
                "regionName": "Jacksonville, FL",
                "usdGrowth": 9944,
                "zhvi": 376446.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.28876716649354,
                    39.69351161112097
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.6116913457380619,
                "regionName": "Jacksonville, IL",
                "usdGrowth": 742,
                "zhvi": 121801
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.4290817936915,
                    34.726073665015285
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.109308291003507,
                "regionName": "Jacksonville, NC",
                "usdGrowth": 9812,
                "zhvi": 242416.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.16559897490669,
                    31.83725799918622
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.394092940751143,
                "regionName": "Jacksonville, TX",
                "usdGrowth": 6379,
                "zhvi": 190632.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.95637318071924,
                    46.97962541026844
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9435372478856063,
                "regionName": "Jamestown, ND",
                "usdGrowth": 1891,
                "zhvi": 200914
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.36691762613171,
                    42.22769209866018
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.262780776009636,
                "regionName": "Jamestown, NY",
                "usdGrowth": 5125,
                "zhvi": 159703
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.07147899656309,
                    42.6715161578651
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9877425112185394,
                "regionName": "Janesville, WI",
                "usdGrowth": 2052,
                "zhvi": 209530.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.04043979917635,
                    38.38186730617468
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.213415307788961,
                "regionName": "Jasper, IN",
                "usdGrowth": 4699,
                "zhvi": 214194.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.09105846336796,
                    38.63956091290999
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.460377892965131,
                "regionName": "Jefferson City, MO",
                "usdGrowth": 5475,
                "zhvi": 224936
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.56814787706679,
                    34.13794553105409
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9342797704984833,
                "regionName": "Jefferson, GA",
                "usdGrowth": 7142,
                "zhvi": 372374.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.9189487837012,
                    31.55218090471445
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0337848668787153,
                "regionName": "Jesup, GA",
                "usdGrowth": 5348,
                "zhvi": 178789.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.33433266725949,
                    36.253475624277975
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.860152740406579,
                "regionName": "Johnson City, TN",
                "usdGrowth": 8583,
                "zhvi": 225366.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.71377427780492,
                    40.495274043932255
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.725159745111058,
                "regionName": "Johnstown, PA",
                "usdGrowth": 2959,
                "zhvi": 109665
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.64795530181921,
                    35.69860575481182
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.851119787090604,
                "regionName": "Jonesboro, AR",
                "usdGrowth": 3377,
                "zhvi": 183861.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.33996671981322,
                    37.05687355664164
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.338666512006638,
                "regionName": "Joplin, MO",
                "usdGrowth": 8110,
                "zhvi": 190097.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -134.61855224395728,
                    58.117931106373575
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6321868448145533,
                "regionName": "Juneau, AK",
                "usdGrowth": 12924,
                "zhvi": 496474.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -156.337150252332,
                    20.79303601975128
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.813621871739528,
                "regionName": "Kahului, HI",
                "usdGrowth": 51174,
                "zhvi": 1081819.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.78447818628693,
                    42.24878937773378
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9020305768117092,
                "regionName": "Kalamazoo, MI",
                "usdGrowth": 4548,
                "zhvi": 241631
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -114.05205687201486,
                    48.295758656290026
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.601266787305057,
                "regionName": "Kalispell, MT",
                "usdGrowth": -11371,
                "zhvi": 706343
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.86205333808664,
                    41.13746989052834
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.938769163866497,
                "regionName": "Kankakee, IL",
                "usdGrowth": 3665,
                "zhvi": 190495.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.44405077320087,
                    38.935032486991076
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7503331432632505,
                "regionName": "Kansas City, MO",
                "usdGrowth": 2152,
                "zhvi": 287770.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -159.5245993506783,
                    22.057683207851838
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 7.202957320753778,
                "regionName": "Kapaa, HI",
                "usdGrowth": 66902,
                "zhvi": 951016
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.03152172974512,
                    40.73491704779115
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.178570123303029,
                "regionName": "Kearney, NE",
                "usdGrowth": 6012,
                "zhvi": 278274.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -72.25311042503868,
                    42.92015988396571
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7564860620293987,
                "regionName": "Keene, NH",
                "usdGrowth": 8680,
                "zhvi": 320199
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.41966712509108,
                    41.396724837692204
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.46598619156883,
                "regionName": "Kendallville, IN",
                "usdGrowth": 4961,
                "zhvi": 203165.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.09122242893757,
                    36.271671743658594
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.327551088242388,
                "regionName": "Kennett, MO",
                "usdGrowth": 3044,
                "zhvi": 92731.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.25496822229776,
                    46.363356477574385
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.37193481895573377,
                "regionName": "Kennewick, WA",
                "usdGrowth": 1601,
                "zhvi": 434510.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.34930144437686,
                    30.06040006351068
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.860541041357545,
                "regionName": "Kerrville, TX",
                "usdGrowth": 17137,
                "zhvi": 358440.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -130.9755609767627,
                    55.57445007585609
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3170992223600533,
                "regionName": "Ketchikan, AK",
                "usdGrowth": 8850,
                "zhvi": 385320
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.63934597572417,
                    24.9862419084082
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.273909087165342,
                "regionName": "Key West, FL",
                "usdGrowth": 52768,
                "zhvi": 1024052.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.8677522831308,
                    35.733560866655296
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.088021038816292,
                "regionName": "Kill Devil Hills, NC",
                "usdGrowth": 23461,
                "zhvi": 582335
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.78823073246977,
                    31.207649262765866
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.8132508921610846,
                "regionName": "Killeen, TX",
                "usdGrowth": 9877,
                "zhvi": 263094.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.44437542094232,
                    36.60712271772794
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0017699395462065,
                "regionName": "Kingsport, TN",
                "usdGrowth": 5663,
                "zhvi": 190379.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -74.26252103931508,
                    41.890278806810116
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.2125881691864297,
                "regionName": "Kingston, NY",
                "usdGrowth": 787,
                "zhvi": 376194
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.67680962427731,
                    27.10739856637802
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3121931453714923,
                "regionName": "Kingsville, TX",
                "usdGrowth": 4616,
                "zhvi": 141396.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.64245614613421,
                    35.2403258961091
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.3715753413911935,
                "regionName": "Kinston, NC",
                "usdGrowth": 5995,
                "zhvi": 139642.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.57319694415409,
                    40.28955142438439
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.93332773998473,
                "regionName": "Kirksville, MO",
                "usdGrowth": 4800,
                "zhvi": 165863
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.64964609667904,
                    42.687629844763094
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9636056338658272,
                "regionName": "Klamath Falls, OR",
                "usdGrowth": 2875,
                "zhvi": 299287.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.13914891496152,
                    36.04347850599992
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8033948110704423,
                "regionName": "Knoxville, TN",
                "usdGrowth": 8803,
                "zhvi": 317736
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.11351892353355,
                    40.485277312525625
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.217043672103305,
                "regionName": "Kokomo, IN",
                "usdGrowth": 1937,
                "zhvi": 159818.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.31967952488026,
                    43.77839135828706
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6181259398626215,
                "regionName": "La Crosse, WI",
                "usdGrowth": 4344,
                "zhvi": 270245.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -118.00689794617658,
                    45.30915494629021
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.151229895652638,
                "regionName": "La Grande, OR",
                "usdGrowth": 8907,
                "zhvi": 286189.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.02812115010688,
                    33.033491956201786
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.188963073297721,
                "regionName": "LaGrange, GA",
                "usdGrowth": -4235,
                "zhvi": 188983.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -71.41684234793169,
                    43.51637313704756
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.689033364736127,
                "regionName": "Laconia, NH",
                "usdGrowth": 11739,
                "zhvi": 439465.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.93158086688322,
                    40.5132893656209
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.790849763498131,
                "regionName": "Lafayette, IN",
                "usdGrowth": 1870,
                "zhvi": 237601.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.0590714894981,
                    30.006690409768428
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.713787595084524,
                "regionName": "Lafayette, LA",
                "usdGrowth": 5371,
                "zhvi": 199816.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.25768408386848,
                    30.017757817442345
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.05659499640869514,
                "regionName": "Lake Charles, LA",
                "usdGrowth": -137,
                "zhvi": 232424.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.6216016378076,
                    30.22509788385912
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.071108094787336,
                "regionName": "Lake City, FL",
                "usdGrowth": 11757,
                "zhvi": 237184.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -113.75779024699024,
                    35.704717027676274
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.1030423214648184,
                "regionName": "Lake Havasu City, AZ",
                "usdGrowth": 4173,
                "zhvi": 380854.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.69732946767758,
                    27.95027104919271
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6375143232036553,
                "regionName": "Lakeland, FL",
                "usdGrowth": 8346,
                "zhvi": 321164.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.94772421491527,
                    32.74255571562175
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9565588994284595,
                "regionName": "Lamesa, TX",
                "usdGrowth": 3268,
                "zhvi": 112299.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.24770128167795,
                    40.039045627331106
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.0712001775223408,
                "regionName": "Lancaster, PA",
                "usdGrowth": 3453,
                "zhvi": 324206.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.60750067899436,
                    42.71373460666029
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.101762937374361,
                "regionName": "Lansing, MI",
                "usdGrowth": 4584,
                "zhvi": 219724.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.72354149190659,
                    41.654987051448096
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2213740967783266,
                "regionName": "Laramie, WY",
                "usdGrowth": 7565,
                "zhvi": 343030.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.33237355292243,
                    27.761036904080022
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9335135485084674,
                "regionName": "Laredo, TX",
                "usdGrowth": 1745,
                "zhvi": 187368.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.83293866650692,
                    32.35275770791388
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.5924384792367245,
                "regionName": "Las Cruces, NM",
                "usdGrowth": 11611,
                "zhvi": 256954
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -104.8163561551536,
                    35.48014806854837
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.998088502448703,
                "regionName": "Las Vegas, NM",
                "usdGrowth": 6328,
                "zhvi": 213349.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -115.0130241423155,
                    36.214588547256135
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.5907273591568842,
                "regionName": "Las Vegas, NV",
                "usdGrowth": -7084,
                "zhvi": 443462.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.14381315980631,
                    31.817838521373623
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.058066751333432,
                "regionName": "Laurel, MS",
                "usdGrowth": 2789,
                "zhvi": 136514
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.47579779899118,
                    34.83862989795443
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.673970484265008,
                "regionName": "Laurinburg, NC",
                "usdGrowth": 5310,
                "zhvi": 115835.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.2925121010336,
                    38.885036362196004
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.31915868214506793,
                "regionName": "Lawrence, KS",
                "usdGrowth": 877,
                "zhvi": 279668
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.39787695188329,
                    35.21675200840115
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.850402335157818,
                "regionName": "Lawrenceburg, TN",
                "usdGrowth": 9667,
                "zhvi": 169366
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.4349725567873,
                    34.524360664834774
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7174165253999845,
                "regionName": "Lawton, OK",
                "usdGrowth": 3383,
                "zhvi": 125646.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.58884930431101,
                    37.65896829070415
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9514946954764647,
                "regionName": "Lebanon, MO",
                "usdGrowth": 7082,
                "zhvi": 181951.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -72.309898,
                    43.646214
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.691708231167728,
                "regionName": "Lebanon, NH",
                "usdGrowth": 12285,
                "zhvi": 339085
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.45651840663922,
                    40.36680310573561
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6142626961133204,
                "regionName": "Lebanon, PA",
                "usdGrowth": 6819,
                "zhvi": 263344
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -102.34316758669712,
                    33.607712564848875
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.105766460778219,
                "regionName": "Levelland, TX",
                "usdGrowth": 4964,
                "zhvi": 161919.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.05996014351825,
                    40.96188846086164
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4974431885334694,
                "regionName": "Lewisburg, PA",
                "usdGrowth": 6261,
                "zhvi": 253123.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.76420987960459,
                    35.45798776639686
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.0432495736543723,
                "regionName": "Lewisburg, TN",
                "usdGrowth": 2837,
                "zhvi": 273034.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -116.94368081615828,
                    46.26754451187799
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7900317663408636,
                "regionName": "Lewiston, ID",
                "usdGrowth": 10526,
                "zhvi": 381910
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -70.2038062723681,
                    44.16647469646867
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1543944359914464,
                "regionName": "Lewiston, ME",
                "usdGrowth": 6262,
                "zhvi": 293435.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.6107073840827,
                    40.61116938695691
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.870162605302137,
                "regionName": "Lewistown, PA",
                "usdGrowth": 4200,
                "zhvi": 147982
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.4337190413693,
                    38.0893582715597
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5962804170016864,
                "regionName": "Lexington, KY",
                "usdGrowth": 4293,
                "zhvi": 270518
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.82328578379575,
                    40.75930730797413
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6724250851027604,
                "regionName": "Lexington, NE",
                "usdGrowth": 4372,
                "zhvi": 165247.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.85072007820635,
                    37.193246315172594
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.705591231011842,
                "regionName": "Liberal, KS",
                "usdGrowth": 6596,
                "zhvi": 143541.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.10802343012278,
                    40.77285241962428
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.577550135281181,
                "regionName": "Lima, OH",
                "usdGrowth": 2584,
                "zhvi": 165260.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.36638783907357,
                    40.12581572346816
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0095481586862314,
                "regionName": "Lincoln, IL",
                "usdGrowth": 2438,
                "zhvi": 122304.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.8707712622316,
                    40.81990093925166
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.5055645092576116,
                "regionName": "Lincoln, NE",
                "usdGrowth": -1390,
                "zhvi": 274315
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.396751542398,
                    34.75830304680012
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.088018384576227,
                "regionName": "Little Rock, AR",
                "usdGrowth": 4102,
                "zhvi": 197988
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.63785995407073,
                    41.232559666114284
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2674033747448745,
                "regionName": "Lock Haven, PA",
                "usdGrowth": 4232,
                "zhvi": 188365
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -111.77032826794428,
                    41.892466983312936
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.5580593391336381,
                "regionName": "Logan, UT",
                "usdGrowth": -2685,
                "zhvi": 477893
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.34830753380362,
                    40.76135835264832
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.516577783899427,
                "regionName": "Logansport, IN",
                "usdGrowth": 3113,
                "zhvi": 124903.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.04799935242468,
                    36.92383718429039
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9390753302485075,
                "regionName": "London, KY",
                "usdGrowth": 4211,
                "zhvi": 144937.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.82905505550319,
                    32.37321528170044
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.689121200501132,
                "regionName": "Longview, TX",
                "usdGrowth": 7507,
                "zhvi": 206397
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.6782231087253,
                    46.190747214791614
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6929833914185162,
                "regionName": "Longview, WA",
                "usdGrowth": 7029,
                "zhvi": 417403
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.3134984714598,
                    35.86631386252186
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1072448121074396,
                "regionName": "Los Alamos, NM",
                "usdGrowth": 13317,
                "zhvi": 433724.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -118.43541005813965,
                    33.39438740994277
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.8790872711942406,
                "regionName": "Los Angeles, CA",
                "usdGrowth": -26830,
                "zhvi": 924032.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.67088304917709,
                    38.337276094310496
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.3991165632685527,
                "regionName": "Louisville, KY",
                "usdGrowth": 3365,
                "zhvi": 241719.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.64477630060794,
                    33.46828815543343
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0556824066007255,
                "regionName": "Lubbock, TX",
                "usdGrowth": 4217,
                "zhvi": 206886
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.24988902362009,
                    43.99509217597313
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.672367204828503,
                "regionName": "Ludington, MI",
                "usdGrowth": 5611,
                "zhvi": 212042.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.60901487103342,
                    31.25457346575521
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.4228357613990443,
                "regionName": "Lufkin, TX",
                "usdGrowth": 5994,
                "zhvi": 177689.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.10250529822616,
                    34.642444964540466
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.7793209209520304,
                "regionName": "Lumberton, NC",
                "usdGrowth": 4369,
                "zhvi": 117474
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.21736608335144,
                    37.36535384860071
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7854626176691353,
                "regionName": "Lynchburg, VA",
                "usdGrowth": 7155,
                "zhvi": 260063
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.6777554116872,
                    40.45674722499662
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2026522714842909,
                "regionName": "Macomb, IL",
                "usdGrowth": 1108,
                "zhvi": 92709.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.7147800841429,
                    32.859179456445496
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.035272445171,
                "regionName": "Macon, GA",
                "usdGrowth": 6569,
                "zhvi": 165177
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.76655893105641,
                    37.21513970630469
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.766355376079821,
                "regionName": "Madera, CA",
                "usdGrowth": 7339,
                "zhvi": 418957
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.43633382971198,
                    38.78576239416537
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6413150065055193,
                "regionName": "Madison, IN",
                "usdGrowth": 5048,
                "zhvi": 193039
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.59243762189784,
                    43.07963387178797
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.10518517432195085,
                "regionName": "Madison, WI",
                "usdGrowth": 392,
                "zhvi": 373912.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.54670406331678,
                    37.30939025325704
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.363876369161629,
                "regionName": "Madisonville, KY",
                "usdGrowth": 2876,
                "zhvi": 122732.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.22642792543564,
                    33.21230701170825
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5541440432125373,
                "regionName": "Magnolia, AR",
                "usdGrowth": 1864,
                "zhvi": 120480
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -74.29926031613691,
                    44.59040890776618
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.262810295503585,
                "regionName": "Malone, NY",
                "usdGrowth": 3403,
                "zhvi": 151658.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.95396324529621,
                    34.317092590464355
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.01619838201973,
                "regionName": "Malvern, AR",
                "usdGrowth": 2746,
                "zhvi": 137198.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -71.72002529974543,
                    42.9153778541781
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8660117755938592,
                "regionName": "Manchester, NH",
                "usdGrowth": 3842,
                "zhvi": 444647.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.50982959394022,
                    39.34126968503338
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.079417551256095,
                "regionName": "Manhattan, KS",
                "usdGrowth": 7973,
                "zhvi": 262415
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.80928853452389,
                    44.119468014581464
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.347312661916606,
                "regionName": "Manitowoc, WI",
                "usdGrowth": 6156,
                "zhvi": 186018.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.13493477720257,
                    44.15525565033988
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.461082473801231,
                "regionName": "Mankato, MN",
                "usdGrowth": 9719,
                "zhvi": 284972
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.53799609841498,
                    40.771803076613466
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3798813586060366,
                "regionName": "Mansfield, OH",
                "usdGrowth": 5671,
                "zhvi": 169978.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.49121381912454,
                    39.4569057074807
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8063396452252545,
                "regionName": "Marietta, OH",
                "usdGrowth": 5081,
                "zhvi": 183137
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.82877937179786,
                    45.4686153884074
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.903447712844192,
                "regionName": "Marinette, WI",
                "usdGrowth": 4385,
                "zhvi": 152630.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.65468701539882,
                    40.515872281021956
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2158705379835637,
                "regionName": "Marion, IN",
                "usdGrowth": 1388,
                "zhvi": 115157
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.04824250152667,
                    35.67736231994128
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.235250052261246,
                "regionName": "Marion, NC",
                "usdGrowth": 8360,
                "zhvi": 200942.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.15736304810984,
                    40.58610662430495
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7981262528535034,
                "regionName": "Marion, OH",
                "usdGrowth": 4045,
                "zhvi": 146181.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.64043700654217,
                    46.433891400279826
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6519554645677363,
                "regionName": "Marquette, MI",
                "usdGrowth": 5838,
                "zhvi": 222450.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.838061028829,
                    44.413278646748196
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3289526892061554,
                "regionName": "Marshall, MN",
                "usdGrowth": 4614,
                "zhvi": 199741.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.20259963949648,
                    39.137342879746
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.847601246058984,
                "regionName": "Marshall, MO",
                "usdGrowth": 3874,
                "zhvi": 137767.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.99908189944014,
                    42.03586837001762
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.069719418794242,
                "regionName": "Marshalltown, IA",
                "usdGrowth": 2939,
                "zhvi": 143045.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.71990865362842,
                    36.298962322417815
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.007468472890203,
                "regionName": "Martin, TN",
                "usdGrowth": 5651,
                "zhvi": 143529.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.8759948942733,
                    36.68533491552051
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1279450669056734,
                "regionName": "Martinsville, VA",
                "usdGrowth": 2141,
                "zhvi": 101755
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.88133007606324,
                    40.36079813193308
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3634480253756314,
                "regionName": "Maryville, MO",
                "usdGrowth": 6570,
                "zhvi": 198313.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.26108043095459,
                    43.203740058685504
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.001792939099251,
                "regionName": "Mason City, IA",
                "usdGrowth": 3145,
                "zhvi": 158257.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.6514331492928,
                    36.7229250539234
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.548306579930041,
                "regionName": "Mayfield, KY",
                "usdGrowth": 3359,
                "zhvi": 133044.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.82151043489867,
                    38.59471934546925
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9290106403309224,
                "regionName": "Maysville, KY",
                "usdGrowth": 3766,
                "zhvi": 129852.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.7513431998202,
                    34.92065822877906
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.5024320335299506,
                "regionName": "McAlester, OK",
                "usdGrowth": 4085,
                "zhvi": 118429.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.1829969630262,
                    26.394182168131124
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.161076171921727,
                "regionName": "McAllen, TX",
                "usdGrowth": 7080,
                "zhvi": 172816.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.66090823745053,
                    31.17481849100509
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7279982424475435,
                "regionName": "McComb, MS",
                "usdGrowth": 2199,
                "zhvi": 128116.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.77969116990623,
                    35.67282990391151
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.537248174238034,
                "regionName": "McMinnville, TN",
                "usdGrowth": 7945,
                "zhvi": 177837.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.64769868954731,
                    38.39184858442235
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9245973161870773,
                "regionName": "McPherson, KS",
                "usdGrowth": 6016,
                "zhvi": 208329.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.10760591858413,
                    41.68447708639926
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.273606973732745,
                "regionName": "Meadville, PA",
                "usdGrowth": 3204,
                "zhvi": 142318.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.72893089718151,
                    42.43201125746046
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.3503000137589023,
                "regionName": "Medford, OR",
                "usdGrowth": -5972,
                "zhvi": 440572.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.81529208429548,
                    35.00675604082545
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2802995083058595,
                "regionName": "Memphis, TN",
                "usdGrowth": 5290,
                "zhvi": 234397.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.89624809774931,
                    44.94562798981615
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9464372452908876,
                "regionName": "Menomonie, WI",
                "usdGrowth": 7307,
                "zhvi": 250827
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.72090348821156,
                    37.18922368613829
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.176556992512795,
                "regionName": "Merced, CA",
                "usdGrowth": -4988,
                "zhvi": 421772
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.66324491713695,
                    32.41311270699034
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.421862913328728,
                "regionName": "Meridian, MS",
                "usdGrowth": 2754,
                "zhvi": 114734.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.8424268342768,
                    39.21587700494915
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.498896251373712,
                "regionName": "Mexico, MO",
                "usdGrowth": 4825,
                "zhvi": 140049
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.50266443681728,
                    26.148108576311568
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.602430184677337,
                "regionName": "Miami, FL",
                "usdGrowth": 21025,
                "zhvi": 466683.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.81011909082672,
                    36.83532654684022
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.676748111648124,
                "regionName": "Miami, OK",
                "usdGrowth": 3764,
                "zhvi": 104006.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.74072188230272,
                    41.54366008120977
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7241893234651626,
                "regionName": "Michigan City, IN",
                "usdGrowth": 3792,
                "zhvi": 221836.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.6776667139934,
                    36.73355173927728
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5878012553187455,
                "regionName": "Middlesborough, KY",
                "usdGrowth": 2034,
                "zhvi": 79325.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.38804373943552,
                    43.643307708794715
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.5257776328015623,
                "regionName": "Midland, MI",
                "usdGrowth": 1123,
                "zhvi": 214257
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.99106857110235,
                    32.089653250665656
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8404880204087407,
                "regionName": "Midland, TX",
                "usdGrowth": 2413,
                "zhvi": 288070.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.08568463615524,
                    33.200383598089466
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9005435860495306,
                "regionName": "Milledgeville, GA",
                "usdGrowth": 7585,
                "zhvi": 197689
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.17222571277324,
                    43.177794548579904
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.4007111943241335,
                "regionName": "Milwaukee, WI",
                "usdGrowth": 1068,
                "zhvi": 266804
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.3131900074857,
                    32.75310984577329
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.7380585399210196,
                "regionName": "Mineral Wells, TX",
                "usdGrowth": 9962,
                "zhvi": 214408.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.34471144879996,
                    45.066144698918286
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.5486039297062226,
                "regionName": "Minneapolis, MN",
                "usdGrowth": -2039,
                "zhvi": 371077.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.20263861107551,
                    48.31703535108218
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.6791452799041717,
                "regionName": "Minot, ND",
                "usdGrowth": 1885,
                "zhvi": 278151.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -113.92135082437044,
                    47.0372858338845
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.3499189496121951,
                "regionName": "Missoula, MT",
                "usdGrowth": -2067,
                "zhvi": 586376.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.965984581333,
                    43.67477394876495
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5893342108931323,
                "regionName": "Mitchell, SD",
                "usdGrowth": 6064,
                "zhvi": 236616
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.49713739897629,
                    39.44007256883332
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.485959880680952,
                "regionName": "Moberly, MO",
                "usdGrowth": 4747,
                "zhvi": 138142.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.20842409317349,
                    30.784723466572515
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8285295855332522,
                "regionName": "Mobile, AL",
                "usdGrowth": 3323,
                "zhvi": 182751
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.99707216574284,
                    37.55862499140968
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.1244056171562313,
                "regionName": "Modesto, CA",
                "usdGrowth": -5252,
                "zhvi": 465870.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.28589104242764,
                    32.686234707424816
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2244968218087502,
                "regionName": "Monroe, LA",
                "usdGrowth": 2046,
                "zhvi": 167620.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.53749863651453,
                    41.92734150810785
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5189156254773921,
                "regionName": "Monroe, MI",
                "usdGrowth": 3523,
                "zhvi": 234318.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.40305714222357,
                    32.362151908345965
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2242099944731115,
                "regionName": "Montgomery, AL",
                "usdGrowth": 4090,
                "zhvi": 185580
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.26390223078441,
                    38.40214114290214
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.21933437541626,
                "regionName": "Montrose, CO",
                "usdGrowth": 17280,
                "zhvi": 414340
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.54120135172668,
                    34.893294102839434
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9179548999023086,
                "regionName": "Morehead City, NC",
                "usdGrowth": 12295,
                "zhvi": 425763
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.44702163869232,
                    29.692620974495053
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.462327389626194,
                "regionName": "Morgan City, LA",
                "usdGrowth": 2113,
                "zhvi": 145460.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.80264548519901,
                    39.52628234787544
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.868251352382142,
                "regionName": "Morgantown, WV",
                "usdGrowth": 3876,
                "zhvi": 208968
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.38422508191586,
                    36.11040879189856
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.355087602901928,
                "regionName": "Morristown, TN",
                "usdGrowth": 10065,
                "zhvi": 234423
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -116.71136984404028,
                    46.81587887014654
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9626155283294495,
                "regionName": "Moscow, ID",
                "usdGrowth": 14310,
                "zhvi": 489016.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.45007486441472,
                    47.207537371796796
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.051381334167194,
                "regionName": "Moses Lake, WA",
                "usdGrowth": 14006,
                "zhvi": 351464
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.76779459901037,
                    31.188105878004595
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4690795596087236,
                "regionName": "Moultrie, GA",
                "usdGrowth": 1984,
                "zhvi": 136281.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.69102282686903,
                    36.416894891687576
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.510541813037253,
                "regionName": "Mount Airy, NC",
                "usdGrowth": 2889,
                "zhvi": 193212.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.023349,
                    37.851107
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -4.3242295095817,
                "regionName": "Mount Gay, WV",
                "usdGrowth": -4744,
                "zhvi": 108583
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.84664923425134,
                    43.64060975828056
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.625600493721361,
                "regionName": "Mount Pleasant, MI",
                "usdGrowth": 5105,
                "zhvi": 196544.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.96797272945099,
                    33.2133971944292
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.825173508601041,
                "regionName": "Mount Pleasant, TX",
                "usdGrowth": 9313,
                "zhvi": 196815.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.749687460929,
                    38.05268945390417
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8207474371070056,
                "regionName": "Mount Sterling, KY",
                "usdGrowth": 4411,
                "zhvi": 158015.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.92400250072805,
                    38.29980056920208
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.144073995033848,
                "regionName": "Mount Vernon, IL",
                "usdGrowth": 5303,
                "zhvi": 130091
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.42027562998777,
                    40.39830216854107
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.375131932913016,
                "regionName": "Mount Vernon, OH",
                "usdGrowth": 7646,
                "zhvi": 229385.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.76613095227479,
                    48.48171487994422
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.9836195867980944,
                "regionName": "Mount Vernon, WA",
                "usdGrowth": -11596,
                "zhvi": 581434.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.33782872300631,
                    36.287843852033426
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.620894037902365,
                "regionName": "Mountain Home, AR",
                "usdGrowth": 3065,
                "zhvi": 190069.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -115.4701577562664,
                    43.350710102468604
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.217513874527877,
                "regionName": "Mountain Home, ID",
                "usdGrowth": 10702,
                "zhvi": 337054
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.39732771594629,
                    40.22787246512594
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.1707894257051363,
                "regionName": "Muncie, IN",
                "usdGrowth": 234,
                "zhvi": 138159.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.27315930463446,
                    36.62093410756285
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1264323962039993,
                "regionName": "Murray, KY",
                "usdGrowth": 3825,
                "zhvi": 181345.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.1121697002802,
                    41.48370744463976
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8139819514094442,
                "regionName": "Muscatine, IA",
                "usdGrowth": 3175,
                "zhvi": 176269.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.15176712031656,
                    43.29123859462292
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.6584468106256637,
                "regionName": "Muskegon, MI",
                "usdGrowth": 1411,
                "zhvi": 216119.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.37802952172459,
                    35.613184609514306
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8123183476218414,
                "regionName": "Muskogee, OK",
                "usdGrowth": 3172,
                "zhvi": 114168
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.65038351022541,
                    33.988427600632576
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.242813987401366,
                "regionName": "Myrtle Beach, SC",
                "usdGrowth": 10925,
                "zhvi": 344396.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.61803993983663,
                    31.62017124525617
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.575216017138213,
                "regionName": "Nacogdoches, TX",
                "usdGrowth": 7288,
                "zhvi": 207119
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.33283898635342,
                    38.507357508677046
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.5924629942690942,
                "regionName": "Napa, CA",
                "usdGrowth": -5574,
                "zhvi": 932523
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.34687064769075,
                    26.11091986206037
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.431974792989812,
                "regionName": "Naples, FL",
                "usdGrowth": 15430,
                "zhvi": 645042
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.7271136810916,
                    36.08910357600148
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4815932011426627,
                "regionName": "Nashville, TN",
                "usdGrowth": 6656,
                "zhvi": 454757.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.52420822815674,
                    31.459584331469266
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.3875711132203042,
                "regionName": "Natchez, MS",
                "usdGrowth": 450,
                "zhvi": 116370.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.09816515975919,
                    31.723215840643164
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.174771672198231,
                "regionName": "Natchitoches, LA",
                "usdGrowth": 4519,
                "zhvi": 209636.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.03029751670569,
                    35.10329317910066
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.145284051924529,
                "regionName": "New Bern, NC",
                "usdGrowth": 7126,
                "zhvi": 229544
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.39625719266554,
                    39.93029016701306
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.028694673675052,
                "regionName": "New Castle, IN",
                "usdGrowth": 4222,
                "zhvi": 141040.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.33393706336939,
                    40.99206277763279
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3754450147169095,
                "regionName": "New Castle, PA",
                "usdGrowth": 5146,
                "zhvi": 154825
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -72.93620426197175,
                    41.40803250406336
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.3289162260447225,
                "regionName": "New Haven, CT",
                "usdGrowth": 4342,
                "zhvi": 328278.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.92442816986055,
                    29.892051770487928
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.1538472746438282,
                "regionName": "New Orleans, LA",
                "usdGrowth": 3090,
                "zhvi": 270366.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.47226262096329,
                    40.442146952937826
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.036384034517329,
                "regionName": "New Philadelphia, OH",
                "usdGrowth": 5596,
                "zhvi": 186995.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.72562873894951,
                    44.24205651753686
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.327750964112437,
                "regionName": "New Ulm, MN",
                "usdGrowth": 4852,
                "zhvi": 210250.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -71.97372886039702,
                    41.261921507515076
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.235207535878021,
                "regionName": "New York, NY",
                "usdGrowth": 7564,
                "zhvi": 616377.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.59935760801275,
                    34.28629098114971
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.636176218241106,
                "regionName": "Newberry, SC",
                "usdGrowth": 6988,
                "zhvi": 195164.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.869912020868,
                    44.64252874022702
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.161538124068783,
                "regionName": "Newport, OR",
                "usdGrowth": 16075,
                "zhvi": 515880.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.11828724690322,
                    35.927891395270535
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0199860074538085,
                "regionName": "Newport, TN",
                "usdGrowth": 4956,
                "zhvi": 166551
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.41313080416975,
                    41.954473970673774
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.10858627862634324,
                "regionName": "Niles, MI",
                "usdGrowth": -277,
                "zhvi": 253934.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -110.84790882167036,
                    31.525089978446267
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.6304889477765805,
                "regionName": "Nogales, AZ",
                "usdGrowth": 9686,
                "zhvi": 270479.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.490063781599,
                    42.04359407183481
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3474801111801282,
                "regionName": "Norfolk, NE",
                "usdGrowth": 5224,
                "zhvi": 224727.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.77701892973629,
                    41.23408599054258
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2189698266932174,
                "regionName": "North Platte, NE",
                "usdGrowth": 4491,
                "zhvi": 204095.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.32409777087669,
                    27.348524660228644
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.749180388049558,
                "regionName": "North Port, FL",
                "usdGrowth": 3667,
                "zhvi": 499797.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.62710783580022,
                    38.99588883215272
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8705826926240707,
                "regionName": "North Vernon, IN",
                "usdGrowth": 5044,
                "zhvi": 177566.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.16232895469996,
                    36.208413497559725
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.550707627238674,
                "regionName": "North Wilkesboro, NC",
                "usdGrowth": 9459,
                "zhvi": 211823.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.59867951001341,
                    41.14651174696685
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9902907952585605,
                "regionName": "Norwalk, OH",
                "usdGrowth": 3343,
                "zhvi": 169233.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -72.10430975888652,
                    41.488964353181494
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7840887703211996,
                "regionName": "Norwich, CT",
                "usdGrowth": 2674,
                "zhvi": 341902.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.52164072839376,
                    48.147133053749606
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.8050141569414434,
                "regionName": "Oak Harbor, WA",
                "usdGrowth": -5130,
                "zhvi": 635884
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.0580362675387,
                    29.212271129289046
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.200510683973048,
                "regionName": "Ocala, FL",
                "usdGrowth": 14445,
                "zhvi": 283361.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -74.80170244268388,
                    39.150088288438255
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.621562536180289,
                "regionName": "Ocean City, NJ",
                "usdGrowth": 10228,
                "zhvi": 635444
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -102.542942845172,
                    31.868988774966297
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.4707968025905882,
                "regionName": "Odessa, TX",
                "usdGrowth": 935,
                "zhvi": 199586.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.81559850376776,
                    41.432526527876924
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.847884511543284,
                "regionName": "Ogden, UT",
                "usdGrowth": -15131,
                "zhvi": 526768.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.06550039327716,
                    44.49761790252997
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.6845023660128761,
                "regionName": "Ogdensburg, NY",
                "usdGrowth": -832,
                "zhvi": 120096.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.75845448731828,
                    41.403234420941146
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.341063382257657,
                "regionName": "Oil City, PA",
                "usdGrowth": 2651,
                "zhvi": 114363.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.88944346736328,
                    27.38633620172605
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.6399269680061765,
                "regionName": "Okeechobee, FL",
                "usdGrowth": 10251,
                "zhvi": 225577.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.5049379702055,
                    35.429504436460746
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.001109192251654,
                "regionName": "Oklahoma City, OK",
                "usdGrowth": 4368,
                "zhvi": 220120.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.67923096260327,
                    42.24778240743578
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.386145215745301,
                "regionName": "Olean, NY",
                "usdGrowth": 4385,
                "zhvi": 132509.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.82906558904119,
                    46.92918950464678
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.4843067628115568,
                "regionName": "Olympia, WA",
                "usdGrowth": 2540,
                "zhvi": 534181
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.99965634586626,
                    41.28980743281535
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8886668489101575,
                "regionName": "Omaha, NE",
                "usdGrowth": 2425,
                "zhvi": 273552
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.03151402305338,
                    42.63492579356857
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9585234720685818,
                "regionName": "Oneonta, NY",
                "usdGrowth": 3900,
                "zhvi": 200709.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -117.5877837146038,
                    43.22677536666217
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.5559357872310278,
                "regionName": "Ontario, OR",
                "usdGrowth": 10943,
                "zhvi": 312373
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.0013580613131,
                    30.59724261775229
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4647907385680816,
                "regionName": "Opelousas, LA",
                "usdGrowth": 2239,
                "zhvi": 153808.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.79886287288664,
                    33.43910730217231
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9337131704201207,
                "regionName": "Orangeburg, SC",
                "usdGrowth": 5182,
                "zhvi": 133877
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.36131186748011,
                    28.434037695594988
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4224827102269737,
                "regionName": "Orlando, FL",
                "usdGrowth": 9566,
                "zhvi": 400191.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.64477095762017,
                    44.068869222456094
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2890027984808492,
                "regionName": "Oshkosh, WI",
                "usdGrowth": 2844,
                "zhvi": 221712
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.64083906712135,
                    41.33521502497396
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7238551066230205,
                "regionName": "Oskaloosa, IA",
                "usdGrowth": 2562,
                "zhvi": 149488.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -118.56017344847986,
                    46.9829975713649
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.327573894987868,
                "regionName": "Othello, WA",
                "usdGrowth": 12328,
                "zhvi": 289927.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.17470134485495,
                    41.357199885540965
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6364060861090577,
                "regionName": "Ottawa, IL",
                "usdGrowth": 3989,
                "zhvi": 153132
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.28644340514477,
                    38.56443815276439
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.952525780342588,
                "regionName": "Ottawa, KS",
                "usdGrowth": 7850,
                "zhvi": 201934.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.40981889344351,
                    40.87920338610093
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8610763015681895,
                "regionName": "Ottumwa, IA",
                "usdGrowth": 2086,
                "zhvi": 112892.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.22627088268706,
                    44.02240351310225
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4595736028339408,
                "regionName": "Owatonna, MN",
                "usdGrowth": 3683,
                "zhvi": 253694.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.07252677629404,
                    37.6986993036114
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.3646431395952519,
                "regionName": "Owensboro, KY",
                "usdGrowth": 2431,
                "zhvi": 178784.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.4849096100213,
                    34.356878744215905
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8232369915511037,
                "regionName": "Oxford, MS",
                "usdGrowth": 4634,
                "zhvi": 256376.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.07863691215124,
                    34.47315952307369
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.7414944256348202,
                "regionName": "Oxnard, CA",
                "usdGrowth": -14893,
                "zhvi": 849987.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.61095741547842,
                    31.43037123299167
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.027258062810886,
                "regionName": "Ozark, AL",
                "usdGrowth": 2707,
                "zhvi": 134694.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.66540449570786,
                    37.13887572944062
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2318226244107917,
                "regionName": "Paducah, KY",
                "usdGrowth": 4887,
                "zhvi": 153214.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -116.47227020449294,
                    38.04264256076845
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.30087093335625226,
                "regionName": "Pahrump, NV",
                "usdGrowth": 1129,
                "zhvi": 382322.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.74230285429269,
                    29.60779729430368
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.750496581997492,
                "regionName": "Palatka, FL",
                "usdGrowth": 9634,
                "zhvi": 207703.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.65354822552332,
                    31.81534745292319
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.119735656859215,
                "regionName": "Palestine, TX",
                "usdGrowth": 6480,
                "zhvi": 159652
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.7309102246706,
                    28.294095037513763
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3302464795567577,
                "regionName": "Palm Bay, FL",
                "usdGrowth": 8418,
                "zhvi": 365193.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.81292223381115,
                    35.400818779902565
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.461862017847778,
                "regionName": "Pampa, TX",
                "usdGrowth": 2116,
                "zhvi": 86977
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.46362155659493,
                    30.12806004705906
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.662444463634151,
                "regionName": "Panama City, FL",
                "usdGrowth": 9328,
                "zhvi": 354068.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.558326678069,
                    36.11735459967997
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.602525176679075,
                "regionName": "Paragould, AR",
                "usdGrowth": 2533,
                "zhvi": 158972
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.30121796856562,
                    36.33160906199435
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.525823676721387,
                "regionName": "Paris, TN",
                "usdGrowth": 6047,
                "zhvi": 174334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.5740477667543,
                    33.669817630404296
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.272915128971926,
                "regionName": "Paris, TX",
                "usdGrowth": 7230,
                "zhvi": 172096.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.46223338357645,
                    39.14020739917874
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8133951771098786,
                "regionName": "Parkersburg, WV",
                "usdGrowth": 1185,
                "zhvi": 146070
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.298496788336,
                    37.19113093355278
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.677454163125501,
                "regionName": "Parsons, KS",
                "usdGrowth": 4155,
                "zhvi": 74774
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -110.81327791740476,
                    33.8019008472378
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7370229643079627,
                "regionName": "Payson, AZ",
                "usdGrowth": 6991,
                "zhvi": 407117
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.69038960487335,
                    31.32323325235677
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.434580177396484,
                "regionName": "Pecos, TX",
                "usdGrowth": 4935,
                "zhvi": 205434.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.15639976609665,
                    30.68702280377265
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5117417406247888,
                "regionName": "Pensacola, FL",
                "usdGrowth": 4492,
                "zhvi": 299631.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.51484599800983,
                    40.78842493730213
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8505484712762317,
                "regionName": "Peoria, IL",
                "usdGrowth": 2633,
                "zhvi": 143677.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.04525047816405,
                    40.76940965304961
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5637871816146482,
                "regionName": "Peru, IN",
                "usdGrowth": 3184,
                "zhvi": 125365
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.30861838604287,
                    39.89901114332893
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4491065081546495,
                "regionName": "Philadelphia, PA",
                "usdGrowth": 4847,
                "zhvi": 336748.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.07023650527523,
                    33.185477867199424
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.660255885795756,
                "regionName": "Phoenix, AZ",
                "usdGrowth": -17196,
                "zhvi": 465735.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.58677275062098,
                    30.770909348198696
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7657673306994712,
                "regionName": "Picayune, MS",
                "usdGrowth": 5109,
                "zhvi": 186583.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.37013151791136,
                    44.503766892807754
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.211282362547028,
                "regionName": "Pierre, SD",
                "usdGrowth": 6351,
                "zhvi": 289960.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.94998194905432,
                    34.07745490393383
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9502928260906836,
                "regionName": "Pine Bluff, AR",
                "usdGrowth": 1750,
                "zhvi": 90315
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.48474178239306,
                    35.3088525707814
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.347678405009289,
                "regionName": "Pinehurst, NC",
                "usdGrowth": 12985,
                "zhvi": 393093.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.85245777771746,
                    37.50675523488169
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.654341506550864,
                "regionName": "Pittsburg, KS",
                "usdGrowth": 2869,
                "zhvi": 109561
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.82905068365645,
                    40.43987030046475
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.2036157311649582,
                "regionName": "Pittsburgh, PA",
                "usdGrowth": -2544,
                "zhvi": 210621.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.20524837729276,
                    42.374284405110025
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.022866582360641513,
                "regionName": "Pittsfield, MA",
                "usdGrowth": 77,
                "zhvi": 347357.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -101.82681138878635,
                    34.07044900573401
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.948397881391684,
                "regionName": "Plainview, TX",
                "usdGrowth": 3134,
                "zhvi": 107792.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.7063217989094,
                    42.867173097407054
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.261675538062351,
                "regionName": "Platteville, WI",
                "usdGrowth": 4207,
                "zhvi": 187712.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.67875351529251,
                    44.74530904644493
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.860389553884564,
                "regionName": "Plattsburgh, NY",
                "usdGrowth": 7273,
                "zhvi": 191316
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.26185087342779,
                    41.324673670271785
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.489674372455502,
                "regionName": "Plymouth, IN",
                "usdGrowth": 5442,
                "zhvi": 220824
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.22333110337584,
                    42.67002715637753
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5578389054856787,
                "regionName": "Pocatello, ID",
                "usdGrowth": 5092,
                "zhvi": 328165
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.17393030587556,
                    38.79949610949699
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.20816785520191,
                "regionName": "Point Pleasant, WV",
                "usdGrowth": 2798,
                "zhvi": 127747.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.14421434709128,
                    36.817997445745455
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.175365465638559,
                "regionName": "Ponca City, OK",
                "usdGrowth": 2731,
                "zhvi": 87207
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.55784751651152,
                    40.89188291498598
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2990449740097834,
                "regionName": "Pontiac, IL",
                "usdGrowth": 3045,
                "zhvi": 133720
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.40421163159851,
                    36.71462475713781
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.860906297177387,
                "regionName": "Poplar Bluff, MO",
                "usdGrowth": 4209,
                "zhvi": 149230
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.92263194461472,
                    48.04754641734273
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.8902444764348898,
                "regionName": "Port Angeles, WA",
                "usdGrowth": -4585,
                "zhvi": 513674
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.61633944542851,
                    28.47048235747188
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.5593377542782734,
                "regionName": "Port Lavaca, TX",
                "usdGrowth": 7344,
                "zhvi": 209555.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.45011658415663,
                    27.22016510585141
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6572411909699722,
                "regionName": "Port St. Lucie, FL",
                "usdGrowth": 10783,
                "zhvi": 412121
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.47994926630936,
                    34.020974064093544
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5037679015317007,
                "regionName": "Portales, NM",
                "usdGrowth": 3402,
                "zhvi": 137315.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -70.4528235021151,
                    43.69525531974253
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.1422860164347233,
                "regionName": "Portland, ME",
                "usdGrowth": 5376,
                "zhvi": 472311
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.47836183917084,
                    45.59656230072439
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.77559153682592,
                "regionName": "Portland, OR",
                "usdGrowth": -15979,
                "zhvi": 570014
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.98907344748545,
                    38.802701628297385
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4394107887409007,
                "regionName": "Portsmouth, OH",
                "usdGrowth": 2807,
                "zhvi": 116149
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.21507850248722,
                    40.704973378878705
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.185813257227348,
                "regionName": "Pottsville, PA",
                "usdGrowth": 1533,
                "zhvi": 129722.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.55385880590195,
                    34.599339255373174
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.40295681249655113,
                "regionName": "Prescott Valley, AZ",
                "usdGrowth": -2061,
                "zhvi": 508406.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.35629702103748,
                    44.14230227262765
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.4942529021634563,
                "regionName": "Prineville, OR",
                "usdGrowth": 14113,
                "zhvi": 409392.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -71.57395010920956,
                    41.188998109199034
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.9962466674403652,
                "regionName": "Providence, RI",
                "usdGrowth": 4431,
                "zhvi": 448040
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -112.35185987867001,
                    39.861599569547536
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.9233501037599836,
                "regionName": "Provo, UT",
                "usdGrowth": -11342,
                "zhvi": 582981
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -104.51274366202334,
                    38.173591435566
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7212024211172341,
                "regionName": "Pueblo, CO",
                "usdGrowth": 2268,
                "zhvi": 315536.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -117.52417625308372,
                    46.900225229172776
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.8444168666495377,
                "regionName": "Pullman, WA",
                "usdGrowth": 15438,
                "zhvi": 408227
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.92949120918514,
                    26.901310017947196
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.35547059906980116,
                "regionName": "Punta Gorda, FL",
                "usdGrowth": 1408,
                "zhvi": 407533.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.38574824618223,
                    40.028478025885775
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.61046026369503,
                "regionName": "Quincy, IL",
                "usdGrowth": 6975,
                "zhvi": 153938.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.05941253969921,
                    42.74753117496515
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.3680837383543727,
                "regionName": "Racine, WI",
                "usdGrowth": 776,
                "zhvi": 216695.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.45941903182931,
                    35.755560682224576
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.3688819588038053,
                "regionName": "Raleigh, NC",
                "usdGrowth": -6249,
                "zhvi": 454930.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -102.89904590103626,
                    44.19199221475069
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.0110608386312028,
                "regionName": "Rapid City, SD",
                "usdGrowth": 3428,
                "zhvi": 340812.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.61535847874069,
                    26.47411726823948
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.5685968784877766,
                "regionName": "Raymondville, TX",
                "usdGrowth": 3581,
                "zhvi": 101953.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.92457766504175,
                    40.41570540853342
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0696217282353233,
                "regionName": "Reading, PA",
                "usdGrowth": 5475,
                "zhvi": 266285.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.23701708995115,
                    40.125709347296684
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1316706110370602,
                "regionName": "Red Bluff, CA",
                "usdGrowth": 10098,
                "zhvi": 326862
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.7234195032018,
                    44.40849741477882
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.829479949694259,
                "regionName": "Red Wing, MN",
                "usdGrowth": 5782,
                "zhvi": 317467.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.03968841290713,
                    40.76391419089784
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.9470055841844249,
                "regionName": "Redding, CA",
                "usdGrowth": -3631,
                "zhvi": 382461.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.65786896513585,
                    40.61901876411243
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -4.283043287516371,
                "regionName": "Reno, NV",
                "usdGrowth": -24421,
                "zhvi": 562969.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -111.51490293979816,
                    44.140400012876434
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0975905959624725,
                "regionName": "Rexburg, ID",
                "usdGrowth": 13656,
                "zhvi": 446648.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.01044989249823,
                    39.86334440290339
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.363812694117624,
                "regionName": "Richmond, IN",
                "usdGrowth": 3250,
                "zhvi": 138810.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.28904991789877,
                    37.567475582838284
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2295277181921898,
                "regionName": "Richmond, KY",
                "usdGrowth": 7370,
                "zhvi": 230441.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.47276918445766,
                    37.46180303138651
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.759755078309096,
                "regionName": "Richmond, VA",
                "usdGrowth": 9258,
                "zhvi": 339375.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.73892357657549,
                    26.56150059247648
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.642790591183241,
                "regionName": "Rio Grande City, TX",
                "usdGrowth": 3738,
                "zhvi": 104476.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -116.12885923524011,
                    34.55085130513187
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.5680326704822911,
                "regionName": "Riverside, CA",
                "usdGrowth": -9093,
                "zhvi": 577864.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.62968930856978,
                    43.041839961828096
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8576812348291365,
                "regionName": "Riverton, WY",
                "usdGrowth": 5589,
                "zhvi": 302732
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.54527526718735,
                    36.3254265550379
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.298796927013909,
                "regionName": "Roanoke Rapids, NC",
                "usdGrowth": 4562,
                "zhvi": 107991
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.94554494984884,
                    37.28762095416739
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9840570198863015,
                "regionName": "Roanoke, VA",
                "usdGrowth": 7559,
                "zhvi": 256346.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.3218467898501,
                    42.041651961484106
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2509489669474028,
                "regionName": "Rochelle, IL",
                "usdGrowth": 4039,
                "zhvi": 180857
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.33836551574537,
                    43.95565979713897
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8681965040321904,
                "regionName": "Rochester, MN",
                "usdGrowth": 2705,
                "zhvi": 312610
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.50832105608619,
                    42.966271723897705
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.4143379702674681,
                "regionName": "Rochester, NY",
                "usdGrowth": 898,
                "zhvi": 217653
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.88278821174823,
                    41.659438962090476
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2176862955676833,
                "regionName": "Rock Springs, WY",
                "usdGrowth": 3730,
                "zhvi": 307724
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.0422959561782,
                    42.33191169949167
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.628471068993093,
                "regionName": "Rockford, IL",
                "usdGrowth": 1050,
                "zhvi": 167655
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.74491008786251,
                    35.004177186044465
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.4396171506865865,
                "regionName": "Rockingham, NC",
                "usdGrowth": 3715,
                "zhvi": 109742.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.79446266056685,
                    35.939739582030555
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.638788949713038,
                "regionName": "Rocky Mount, NC",
                "usdGrowth": 8432,
                "zhvi": 185218.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.79351727223477,
                    37.87736117712692
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.920907650150998,
                "regionName": "Rolla, MO",
                "usdGrowth": 5802,
                "zhvi": 201305
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.21577392133155,
                    34.262682789887464
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.728267477471802,
                "regionName": "Rome, GA",
                "usdGrowth": 9544,
                "zhvi": 205306.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.16729099396849,
                    43.27941273252636
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.1112566252798948,
                "regionName": "Roseburg, OR",
                "usdGrowth": 3704,
                "zhvi": 335253.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -104.46653654723256,
                    33.36406072355071
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8994275882824758,
                "regionName": "Roswell, NM",
                "usdGrowth": 2809,
                "zhvi": 149173.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.23251861083895,
                    35.21336964413653
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7434033306875927,
                "regionName": "Russellville, AR",
                "usdGrowth": 4275,
                "zhvi": 158286.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.66597410048166,
                    32.600315401900566
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2655899578332694,
                "regionName": "Ruston, LA",
                "usdGrowth": 4427,
                "zhvi": 197294
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.03741676088154,
                    43.577235779007175
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.494714420710264,
                "regionName": "Rutland, VT",
                "usdGrowth": 11621,
                "zhvi": 262584.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.99692523055158,
                    38.78057421213037
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.887048876155265,
                "regionName": "Sacramento, CA",
                "usdGrowth": -17600,
                "zhvi": 605067.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -109.88821782622637,
                    32.931668850714715
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2402073471474084,
                "regionName": "Safford, AZ",
                "usdGrowth": 9268,
                "zhvi": 289705
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.05131209581842,
                    43.3343392278361
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0426639467650336,
                "regionName": "Saginaw, MI",
                "usdGrowth": 2967,
                "zhvi": 146230.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.78094576039352,
                    40.769323731398636
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.961985639744044,
                "regionName": "Salem, OH",
                "usdGrowth": 5340,
                "zhvi": 136562
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.90114826813615,
                    44.903013451976136
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.5840695737923556,
                "regionName": "Salem, OR",
                "usdGrowth": 2599,
                "zhvi": 446224
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.651022048361,
                    38.959175983128716
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0636398543440992,
                "regionName": "Salina, KS",
                "usdGrowth": 5318,
                "zhvi": 175911
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.2413397211987,
                    36.21862404764632
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.1965556598825677,
                "regionName": "Salinas, CA",
                "usdGrowth": -9994,
                "zhvi": 832623.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.47036799887722,
                    38.4168119740089
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.367054475682311,
                "regionName": "Salisbury, MD",
                "usdGrowth": 5264,
                "zhvi": 386896.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -113.00820750823422,
                    40.470482425684544
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.8969694999029354,
                "regionName": "Salt Lake City, UT",
                "usdGrowth": -23461,
                "zhvi": 593507.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.67261999022621,
                    31.363866160105662
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.2655925770009503,
                "regionName": "San Angelo, TX",
                "usdGrowth": 523,
                "zhvi": 197864.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.60176321955328,
                    29.42816395795657
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8002010493639207,
                "regionName": "San Antonio, TX",
                "usdGrowth": 2708,
                "zhvi": 340166.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -116.73653263397205,
                    33.03484597122873
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -3.2274923140058878,
                "regionName": "San Diego, CA",
                "usdGrowth": -29262,
                "zhvi": 895343.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.01781063581235,
                    37.69979452057815
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -4.393844114836294,
                "regionName": "San Francisco, CA",
                "usdGrowth": -62934,
                "zhvi": 1413208.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.37694165554035,
                    36.91048706765662
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -5.696518323961225,
                "regionName": "San Jose, CA",
                "usdGrowth": -91462,
                "zhvi": 1560967.5
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.40390284225124,
                    35.388220293987914
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.49790644141160245,
                "regionName": "San Luis Obispo, CA",
                "usdGrowth": 4343,
                "zhvi": 879207.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -116.60179323835634,
                    48.29996016670349
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.955484916406362,
                "regionName": "Sandpoint, ID",
                "usdGrowth": 17667,
                "zhvi": 604856.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.6290452056247,
                    41.36796058169283
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.28430345992860806,
                "regionName": "Sandusky, OH",
                "usdGrowth": -591,
                "zhvi": 203891
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.1756936166813,
                    35.476231467005796
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 6.08805709334286,
                "regionName": "Sanford, NC",
                "usdGrowth": 13958,
                "zhvi": 235190.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.00665243298114,
                    37.055802905178965
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -4.344601570032006,
                "regionName": "Santa Cruz, CA",
                "usdGrowth": -55540,
                "zhvi": 1259423.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.977471647499,
                    35.50708972946091
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2878191072066496,
                "regionName": "Santa Fe, NM",
                "usdGrowth": 6953,
                "zhvi": 545275
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.70628147399488,
                    34.0178820410612
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.23835010453428174,
                "regionName": "Santa Maria, CA",
                "usdGrowth": -2337,
                "zhvi": 972960.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -122.88625059590858,
                    38.52746428567954
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.72866607388732,
                "regionName": "Santa Rosa, CA",
                "usdGrowth": -5935,
                "zhvi": 812691.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.54353448984683,
                    46.295526527969216
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4657357490321514,
                "regionName": "Sault Ste. Marie, MI",
                "usdGrowth": 3965,
                "zhvi": 162257.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.29929481486154,
                    32.12762970734911
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.8644428228881735,
                "regionName": "Savannah, GA",
                "usdGrowth": 11328,
                "zhvi": 297481.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.51570821597375,
                    41.78869214971547
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9878534156282401,
                "regionName": "Sayre, PA",
                "usdGrowth": 3782,
                "zhvi": 191805.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.7377701188493,
                    42.16127976451522
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.29916338356906,
                "regionName": "Scottsbluff, NE",
                "usdGrowth": 4238,
                "zhvi": 186039
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.99750489357213,
                    34.78144169403431
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.474706377150856,
                "regionName": "Scottsboro, AL",
                "usdGrowth": 3791,
                "zhvi": 154665.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.89451221347731,
                    41.323125379138006
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1175949965469436,
                "regionName": "Scranton, PA",
                "usdGrowth": 5489,
                "zhvi": 178060.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.74908295578764,
                    35.25688493014511
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.196290151765048,
                "regionName": "Searcy, AR",
                "usdGrowth": 6866,
                "zhvi": 166126.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.87980045429028,
                    47.55952348013833
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.409724380370759,
                "regionName": "Seattle, WA",
                "usdGrowth": -18640,
                "zhvi": 766284
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.60556721157823,
                    27.69308960768209
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2138428252048867,
                "regionName": "Sebastian, FL",
                "usdGrowth": 12542,
                "zhvi": 396445.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.34071956645961,
                    27.34254617689687
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.875646271163181,
                "regionName": "Sebring, FL",
                "usdGrowth": 11394,
                "zhvi": 238257.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.28471705959599,
                    38.72798918096532
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9846790947382225,
                "regionName": "Sedalia, MO",
                "usdGrowth": 4308,
                "zhvi": 145838.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.06840690728573,
                    40.77129230660693
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.506427804690153,
                "regionName": "Selinsgrove, PA",
                "usdGrowth": 5749,
                "zhvi": 231757
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.10866709891765,
                    32.32688100951136
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.476534612786724,
                "regionName": "Selma, AL",
                "usdGrowth": 1808,
                "zhvi": 73663
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.82497063899632,
                    42.78081006994876
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.869249187708748,
                "regionName": "Seneca Falls, NY",
                "usdGrowth": 3167,
                "zhvi": 170551.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.06742317248302,
                    34.752251685527355
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3206026491193623,
                "regionName": "Seneca, SC",
                "usdGrowth": 6172,
                "zhvi": 268838.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.52244332405907,
                    35.78077323354283
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.719937922923509,
                "regionName": "Sevierville, TN",
                "usdGrowth": -3272,
                "zhvi": 445126.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.0385188876537,
                    38.909158196162025
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4821928157060076,
                "regionName": "Seymour, IN",
                "usdGrowth": 4857,
                "zhvi": 197666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.74865112559986,
                    44.85087346138825
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8225677861685012,
                "regionName": "Shawano, WI",
                "usdGrowth": 6191,
                "zhvi": 221950.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.94923008331251,
                    35.206140178722585
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0046105101284035,
                "regionName": "Shawnee, OK",
                "usdGrowth": 2892,
                "zhvi": 145349
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.94579283527241,
                    43.72099677267574
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.569044653841071,
                "regionName": "Sheboygan, WI",
                "usdGrowth": 3340,
                "zhvi": 213792.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.55204485857179,
                    35.335533643982224
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 5.004495797193722,
                "regionName": "Shelby, NC",
                "usdGrowth": 10661,
                "zhvi": 216925
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.45549095874945,
                    35.511237458204384
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5279083482943214,
                "regionName": "Shelbyville, TN",
                "usdGrowth": 7032,
                "zhvi": 282419
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.18636851030236,
                    47.350075861544845
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.124930689932009,
                "regionName": "Shelton, WA",
                "usdGrowth": 10050,
                "zhvi": 478615.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.88623892512187,
                    44.79048913166106
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3445897013270636,
                "regionName": "Sheridan, WY",
                "usdGrowth": 9153,
                "zhvi": 393501.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.67753460759798,
                    33.62744998028441
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1339559421105063,
                "regionName": "Sherman, TX",
                "usdGrowth": 8776,
                "zhvi": 283296.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -110.32189825680588,
                    35.39977150258853
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.381958646998091,
                "regionName": "Show Low, AZ",
                "usdGrowth": 9201,
                "zhvi": 390005.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.66831036098215,
                    32.49019544516145
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.5849659000830449,
                "regionName": "Shreveport, LA",
                "usdGrowth": 794,
                "zhvi": 136519
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.2025818899244,
                    40.33163493825123
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.753894276101856,
                "regionName": "Sidney, OH",
                "usdGrowth": 5918,
                "zhvi": 217281
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -109.7516088449886,
                    31.879346836527123
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5812317196290566,
                "regionName": "Sierra Vista, AZ",
                "usdGrowth": 3735,
                "zhvi": 238330.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.56474492877933,
                    37.05588075163136
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.000751661696988,
                "regionName": "Sikeston, MO",
                "usdGrowth": 4307,
                "zhvi": 145356.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -108.38278448724958,
                    32.739112810156996
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6458543937016556,
                "regionName": "Silver City, NM",
                "usdGrowth": 4747,
                "zhvi": 181174
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.37217561802241,
                    42.578537124621946
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0731894779987132,
                "regionName": "Sioux City, IA",
                "usdGrowth": 5701,
                "zhvi": 187658.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.98910268636814,
                    43.499381319572834
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.646261654407565,
                "regionName": "Sioux Falls, SD",
                "usdGrowth": 8294,
                "zhvi": 316434.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.9162663710071,
                    32.74613807561954
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.043707301845027,
                "regionName": "Snyder, TX",
                "usdGrowth": 4076,
                "zhvi": 135754.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.57629079223356,
                    37.1046613139646
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.397985322511957,
                "regionName": "Somerset, KY",
                "usdGrowth": 4821,
                "zhvi": 202855.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.02699592587457,
                    39.97172722690672
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5221502282256116,
                "regionName": "Somerset, PA",
                "usdGrowth": 3915,
                "zhvi": 156864.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -119.95250926178993,
                    38.02644017966632
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.7057811466818067,
                "regionName": "Sonora, CA",
                "usdGrowth": -7066,
                "zhvi": 411573.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.13461614144919,
                    41.77404554185888
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2084312835086881,
                "regionName": "South Bend, IN",
                "usdGrowth": 2384,
                "zhvi": 197836
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.84618462012331,
                    34.835617405402104
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.983142912345718,
                "regionName": "Spartanburg, SC",
                "usdGrowth": 7050,
                "zhvi": 239661.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.79294276845334,
                    44.3591944083786
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7525056991250647,
                "regionName": "Spearfish, SD",
                "usdGrowth": 9640,
                "zhvi": 354379.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.15096481198141,
                    43.082471820315206
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7465465143853907,
                "regionName": "Spencer, IA",
                "usdGrowth": 2792,
                "zhvi": 160917
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.15102060155182,
                    43.37787725272519
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8090627841846425,
                "regionName": "Spirit Lake, IA",
                "usdGrowth": 5666,
                "zhvi": 315285
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -117.57103591470926,
                    48.1937330859396
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.9885424456103054,
                "regionName": "Spokane, WA",
                "usdGrowth": -8835,
                "zhvi": 441938.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.69706313284058,
                    39.8301409806117
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1127143219136952,
                "regionName": "Springfield, IL",
                "usdGrowth": 5274,
                "zhvi": 171146.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -72.6446541995365,
                    42.229348516305905
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7586951340584018,
                "regionName": "Springfield, MA",
                "usdGrowth": 2410,
                "zhvi": 318470.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.17545538146273,
                    37.36415744422077
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.238284815308964,
                "regionName": "Springfield, MO",
                "usdGrowth": 5338,
                "zhvi": 241104
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.78498251675,
                    39.91592258337376
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0893409760541926,
                "regionName": "Springfield, OH",
                "usdGrowth": 5092,
                "zhvi": 166466
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.47211357293932,
                    45.58483908771088
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.0017549966097188,
                "regionName": "St. Cloud, MN",
                "usdGrowth": 2909,
                "zhvi": 293568
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -113.50469802790613,
                    37.28003524744571
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.5932020731719795,
                "regionName": "St. George, UT",
                "usdGrowth": -3423,
                "zhvi": 570130
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.78517305085887,
                    39.83519257254982
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3684626998630676,
                "regionName": "St. Joseph, MO",
                "usdGrowth": 5367,
                "zhvi": 161810
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.35061309305358,
                    38.73568568471409
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.6017122222680669,
                "regionName": "St. Louis, MO",
                "usdGrowth": 1459,
                "zhvi": 243159.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.66601817644177,
                    30.92951916400053
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.4415329592575095,
                "regionName": "St. Marys, GA",
                "usdGrowth": 11497,
                "zhvi": 263475.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.8790513217217,
                    33.42491684722683
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.316386942609477,
                "regionName": "Starkville, MS",
                "usdGrowth": 5237,
                "zhvi": 228626
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.82200624263865,
                    40.920589032026726
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3572348728117687,
                "regionName": "State College, PA",
                "usdGrowth": 7352,
                "zhvi": 314139.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.74811421405653,
                    32.395774062336415
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8456610310063817,
                "regionName": "Statesboro, GA",
                "usdGrowth": 6056,
                "zhvi": 216450.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.12015240158318,
                    38.16247873398781
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3660832914879686,
                "regionName": "Staunton, VA",
                "usdGrowth": 6525,
                "zhvi": 278961
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -106.99055482429054,
                    40.48596505484016
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1308724673533286,
                "regionName": "Steamboat Springs, CO",
                "usdGrowth": 29889,
                "zhvi": 973370.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.21773416774158,
                    32.236026531355535
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.400598885827614,
                "regionName": "Stephenville, TX",
                "usdGrowth": 11153,
                "zhvi": 258285.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.11081703428353,
                    40.72496369554745
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.8058630244631684,
                "regionName": "Sterling, CO",
                "usdGrowth": 9845,
                "zhvi": 262902
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.91556058013408,
                    41.75509713073645
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.106605861223597,
                "regionName": "Sterling, IL",
                "usdGrowth": 2658,
                "zhvi": 127263
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.5015296535515,
                    44.47558711018515
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6720039563894487,
                "regionName": "Stevens Point, WI",
                "usdGrowth": 6800,
                "zhvi": 256949.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.97584943670276,
                    36.076952833525354
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8636820935316825,
                "regionName": "Stillwater, OK",
                "usdGrowth": 1639,
                "zhvi": 190240.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.27300605374977,
                    37.9343373230824
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.0487247884125104,
                "regionName": "Stockton, CA",
                "usdGrowth": -11455,
                "zhvi": 555584.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.15100161714642,
                    42.735458752516166
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7358545055427148,
                "regionName": "Storm Lake, IA",
                "usdGrowth": 2757,
                "zhvi": 159809.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.52797979437844,
                    41.91441767021127
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.7121187492308128,
                "regionName": "Sturgis, MI",
                "usdGrowth": 3262,
                "zhvi": 192605.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.56351138620222,
                    33.14875072118022
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.924183622303897,
                "regionName": "Sulphur Springs, TX",
                "usdGrowth": 7414,
                "zhvi": 192487.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.34535662378352,
                    34.4719769779815
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2722445046536914,
                "regionName": "Summerville, GA",
                "usdGrowth": 4133,
                "zhvi": 128595.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.37942316488409,
                    33.918265341202776
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.394604352614968,
                "regionName": "Sumter, SC",
                "usdGrowth": 5917,
                "zhvi": 176670.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.7079822186614,
                    40.847854333694436
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7041324366933908,
                "regionName": "Sunbury, PA",
                "usdGrowth": 4011,
                "zhvi": 149978.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.59350989108036,
                    40.67311305832384
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.017147670327246,
                "regionName": "Susanville, CA",
                "usdGrowth": 9923,
                "zhvi": 250587
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -100.40602082591526,
                    32.30365281629213
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.673957432589115,
                "regionName": "Sweetwater, TX",
                "usdGrowth": 2778,
                "zhvi": 104927
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.03717240381144,
                    43.154048062805344
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.457995445275225,
                "regionName": "Syracuse, NY",
                "usdGrowth": 4882,
                "zhvi": 200604
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.99980895797265,
                    35.906927754038904
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9970034090904054,
                "regionName": "Tahlequah, OK",
                "usdGrowth": 4720,
                "zhvi": 159241
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.20556726888182,
                    33.17476381088973
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4613191020572183,
                "regionName": "Talladega, AL",
                "usdGrowth": 3778,
                "zhvi": 155080.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.28843529693853,
                    30.40439187853012
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9714302140404723,
                "regionName": "Tallahassee, FL",
                "usdGrowth": 7634,
                "zhvi": 259486.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.42076223707738,
                    28.142195344770123
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1861749914316784,
                "regionName": "Tampa, FL",
                "usdGrowth": 8416,
                "zhvi": 389163
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -105.63101975395969,
                    36.58006021513668
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.831877179817783,
                "regionName": "Taos, NM",
                "usdGrowth": 14769,
                "zhvi": 391842
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.27780481862291,
                    39.54581621300861
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.243653805754775,
                "regionName": "Taylorville, IL",
                "usdGrowth": 1327,
                "zhvi": 107370.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.3431951271245,
                    39.39372678080133
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.254267782838323,
                "regionName": "Terre Haute, IN",
                "usdGrowth": 4260,
                "zhvi": 132736.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -94.21471170699287,
                    33.4744227537347
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0731462091140407,
                "regionName": "Texarkana, TX",
                "usdGrowth": 4811,
                "zhvi": 158472
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.16709537458037,
                    45.162927807597
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.4469923410906125,
                "regionName": "The Dalles, OR",
                "usdGrowth": 12849,
                "zhvi": 377808.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.0794266994383,
                    28.70181753823284
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.790164298101879,
                "regionName": "The Villages, FL",
                "usdGrowth": 20392,
                "zhvi": 437090
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.30024825852213,
                    32.879206712952104
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.443207493337176,
                "regionName": "Thomaston, GA",
                "usdGrowth": 5836,
                "zhvi": 133979.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.91847288637443,
                    30.863923473175202
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.7242066313332454,
                "regionName": "Thomasville, GA",
                "usdGrowth": 7505,
                "zhvi": 204670.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.1278320867685,
                    41.123513110063016
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1668260004593964,
                "regionName": "Tiffin, OH",
                "usdGrowth": 4816,
                "zhvi": 154062.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.52361190467595,
                    31.45743864153463
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.00205551617193,
                "regionName": "Tifton, GA",
                "usdGrowth": 5750,
                "zhvi": 194213.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.29405315219279,
                    34.55151201407278
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1878979265019964,
                "regionName": "Toccoa, GA",
                "usdGrowth": 5684,
                "zhvi": 181501.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.77725700354698,
                    41.49873316655357
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.492378432967574,
                "regionName": "Toledo, OH",
                "usdGrowth": 4210,
                "zhvi": 170751
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.80328238311009,
                    39.043899417794336
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.271314207207114,
                "regionName": "Topeka, KS",
                "usdGrowth": 4038,
                "zhvi": 179422
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -73.24514750127584,
                    41.793753402765
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.4995326238209503,
                "regionName": "Torrington, CT",
                "usdGrowth": 5228,
                "zhvi": 350442
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.05029462789844,
                    45.07350871310688
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6573767237793153,
                "regionName": "Traverse City, MI",
                "usdGrowth": 9887,
                "zhvi": 376099
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -74.70479630994163,
                    40.28047017188603
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.1998794431714144,
                "regionName": "Trenton, NJ",
                "usdGrowth": 4222,
                "zhvi": 353430.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.94082950015871,
                    31.803963832502685
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.591220899074575,
                "regionName": "Troy, AL",
                "usdGrowth": 2476,
                "zhvi": 156750
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.76272806629947,
                    39.303947682029744
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.7374897810354535,
                "regionName": "Truckee, CA",
                "usdGrowth": -4902,
                "zhvi": 663063.6666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -111.7890033042506,
                    32.097133402900546
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.14868766939877842,
                "regionName": "Tucson, AZ",
                "usdGrowth": 502,
                "zhvi": 345266.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -86.1142794841806,
                    35.29801808851155
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.186852628890642,
                "regionName": "Tullahoma, TN",
                "usdGrowth": 10449,
                "zhvi": 253637.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.16624340857163,
                    36.25019523505672
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.01626911727436,
                "regionName": "Tulsa, OK",
                "usdGrowth": 6400,
                "zhvi": 214674.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.68514599896858,
                    34.26556318735665
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8934841356586638,
                "regionName": "Tupelo, MS",
                "usdGrowth": 3050,
                "zhvi": 162417
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.72207666360781,
                    33.16577280207762
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.901704975067581,
                "regionName": "Tuscaloosa, AL",
                "usdGrowth": 6364,
                "zhvi": 221651
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -114.57089764866328,
                    42.43544392541105
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.4749065961997712,
                "regionName": "Twin Falls, ID",
                "usdGrowth": -5658,
                "zhvi": 381592.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.27175680429808,
                    32.374740361939395
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.7062584953714444,
                "regionName": "Tyler, TX",
                "usdGrowth": 9227,
                "zhvi": 252445.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -123.39113127817006,
                    39.438119100498454
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9477908061922493,
                "regionName": "Ukiah, CA",
                "usdGrowth": 15631,
                "zhvi": 539494
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.16556143352722,
                    36.418423182266395
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.29139033675062,
                "regionName": "Union City, TN",
                "usdGrowth": 3904,
                "zhvi": 120462.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -157.97121818360873,
                    21.458031657597026
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.7764215808954547,
                "regionName": "Urban Honolulu, HI",
                "usdGrowth": 7180,
                "zhvi": 934769
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.76875241854188,
                    40.139234266270826
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.925157470477579,
                "regionName": "Urbana, OH",
                "usdGrowth": 5883,
                "zhvi": 203278.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.18158839991308,
                    43.33861570905228
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8571498374947284,
                "regionName": "Utica, NY",
                "usdGrowth": 5308,
                "zhvi": 188286
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.76229172329771,
                    29.35739637451955
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.9923054755061416,
                "regionName": "Uvalde, TX",
                "usdGrowth": 7795,
                "zhvi": 198753.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.24203091949556,
                    30.830005763152318
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.3804802710279223,
                "regionName": "Valdosta, GA",
                "usdGrowth": 6101,
                "zhvi": 182683.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.9357113056752,
                    38.268273533770795
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.526908643762455,
                "regionName": "Vallejo, CA",
                "usdGrowth": -3236,
                "zhvi": 610568.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.59111700409092,
                    40.855413800828885
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8248246837665425,
                "regionName": "Van Wert, OH",
                "usdGrowth": 4061,
                "zhvi": 145373.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.97656917058866,
                    42.91296146607068
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.601109110181299,
                "regionName": "Vermillion, SD",
                "usdGrowth": 6383,
                "zhvi": 248068
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -109.51744150905948,
                    40.12491499181587
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.7176434288748452,
                "regionName": "Vernal, UT",
                "usdGrowth": 11743,
                "zhvi": 320894.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.24178436797402,
                    34.079458120109464
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.289137576140167,
                "regionName": "Vernon, TX",
                "usdGrowth": 4177,
                "zhvi": 98947.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.86764936565302,
                    32.17819774783016
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.042293269464526,
                "regionName": "Vicksburg, MS",
                "usdGrowth": 3303,
                "zhvi": 163237
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.19622931699024,
                    28.727890288712484
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6473081615847125,
                "regionName": "Victoria, TX",
                "usdGrowth": 5781,
                "zhvi": 220441
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.40791559793243,
                    32.14017913261773
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.14406750625485,
                "regionName": "Vidalia, GA",
                "usdGrowth": 4920,
                "zhvi": 158631.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.4194665024079,
                    38.68861576202284
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.3023635897005077,
                "regionName": "Vincennes, IN",
                "usdGrowth": 2948,
                "zhvi": 129324.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.10712559102157,
                    39.37199394387295
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.776030126933527,
                "regionName": "Vineland, NJ",
                "usdGrowth": 6047,
                "zhvi": 219819.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -70.63977287173606,
                    41.3822549266921
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.799137527112115,
                "regionName": "Vineyard Haven, MA",
                "usdGrowth": 33890,
                "zhvi": 1222311.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.42772845178415,
                    36.824335582535035
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.1835849419746425,
                "regionName": "Virginia Beach, VA",
                "usdGrowth": 7166,
                "zhvi": 330938.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -118.80202031475244,
                    36.22026557901601
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.23165102800058787,
                "regionName": "Visalia, CA",
                "usdGrowth": -780,
                "zhvi": 335215.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.7932827178489,
                    40.84704239226268
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4903410708238094,
                "regionName": "Wabash, IN",
                "usdGrowth": 3918,
                "zhvi": 158817.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.09008268541136,
                    31.426474695543146
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.33593625950201134,
                "regionName": "Waco, TX",
                "usdGrowth": 854,
                "zhvi": 258180
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.78560429427094,
                    46.29590236206721
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6786489249078036,
                "regionName": "Wahpeton, ND",
                "usdGrowth": 3013,
                "zhvi": 180519.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -118.24870008193446,
                    46.256001933194284
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.6175199929198038,
                "regionName": "Walla Walla, WA",
                "usdGrowth": 2519,
                "zhvi": 410515.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -84.22421429924675,
                    40.559988586496026
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.8190153665792272,
                "regionName": "Wapakoneta, OH",
                "usdGrowth": 5867,
                "zhvi": 210541.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.63998773519755,
                    32.40933987055222
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.5681540299815575,
                "regionName": "Warner Robins, GA",
                "usdGrowth": 9424,
                "zhvi": 209993.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -79.26969577148462,
                    41.81304977860929
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.5116804775553527,
                "regionName": "Warren, PA",
                "usdGrowth": 3152,
                "zhvi": 126863
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -93.80691167870307,
                    38.74719601413899
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.6927933590525077,
                "regionName": "Warrensburg, MO",
                "usdGrowth": 1694,
                "zhvi": 244969.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -85.86312322367624,
                    41.245216678249605
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.1397554447708664,
                "regionName": "Warsaw, IN",
                "usdGrowth": 7963,
                "zhvi": 256392.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.45620160454665,
                    39.56021306299357
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9881836438951863,
                "regionName": "Washington Court House, OH",
                "usdGrowth": 5068,
                "zhvi": 171612.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.47527242343995,
                    38.835646226368596
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.07312065627511397,
                "regionName": "Washington, DC",
                "usdGrowth": -403,
                "zhvi": 549434
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -87.07185405778186,
                    38.70186039130869
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.2119340243648384,
                "regionName": "Washington, IN",
                "usdGrowth": 4353,
                "zhvi": 198682.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.84325808871532,
                    35.48531943479136
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.550776318079565,
                "regionName": "Washington, NC",
                "usdGrowth": 9669,
                "zhvi": 216611.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -92.468506703387,
                    42.53627052427789
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.2510594854673887,
                "regionName": "Waterloo, IA",
                "usdGrowth": 5701,
                "zhvi": 177411.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -75.9465345742885,
                    44.04200958777568
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.751942275019032,
                "regionName": "Watertown, NY",
                "usdGrowth": 5104,
                "zhvi": 187632.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.1882767670103,
                    44.977881189989716
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.447077379187324,
                "regionName": "Watertown, SD",
                "usdGrowth": 6767,
                "zhvi": 279457.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.77529134225162,
                    43.02054068051061
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.107965119857078,
                "regionName": "Watertown, WI",
                "usdGrowth": 6273,
                "zhvi": 301432
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.80956574415619,
                    27.49293938543744
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 4.8048116605443605,
                "regionName": "Wauchula, FL",
                "usdGrowth": 8568,
                "zhvi": 182065
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -89.75863384016606,
                    44.897925330692786
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.5675461186599366,
                "regionName": "Wausau, WI",
                "usdGrowth": 3509,
                "zhvi": 224759
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -82.36511089441139,
                    31.138914087726878
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.7189053576402857,
                "regionName": "Waycross, GA",
                "usdGrowth": 5251,
                "zhvi": 143403.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.00170784621365,
                    35.6385380206622
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.651089202508725,
                "regionName": "Weatherford, OK",
                "usdGrowth": 4039,
                "zhvi": 153965.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.70350715802195,
                    40.387503885798495
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8940607695077294,
                "regionName": "Weirton, WV",
                "usdGrowth": 2192,
                "zhvi": 116550.33333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.2638536613322,
                    47.819089908166134
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6331957131158594,
                "regionName": "Wenatchee, WA",
                "usdGrowth": 14464,
                "zhvi": 555509.3333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.88683934862398,
                    36.77383886664568
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.255137971935913,
                "regionName": "West Plains, MO",
                "usdGrowth": 5686,
                "zhvi": 177505.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.84176780221226,
                    39.973791132078574
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8041972374685638,
                "regionName": "Wheeling, WV",
                "usdGrowth": 2443,
                "zhvi": 136338.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -88.54163072992095,
                    42.668582018170795
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.7093157364299296,
                "regionName": "Whitewater, WI",
                "usdGrowth": 8459,
                "zhvi": 315106
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -98.49056481284072,
                    33.77566588678639
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.8065574283280786,
                "regionName": "Wichita Falls, TX",
                "usdGrowth": 1204,
                "zhvi": 150076.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.39811440286219,
                    37.62503177506132
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0281449562138536,
                "regionName": "Wichita, KS",
                "usdGrowth": 3943,
                "zhvi": 195841.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.06629983513214,
                    41.343105393182825
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.5559277655226409,
                "regionName": "Williamsport, PA",
                "usdGrowth": 1146,
                "zhvi": 206429.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -103.4793386781163,
                    48.345223531826974
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.6936708033283294,
                "regionName": "Williston, ND",
                "usdGrowth": 5555,
                "zhvi": 330036.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.00586445754108,
                    45.15260590157419
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.087928461284553,
                "regionName": "Willmar, MN",
                "usdGrowth": 7270,
                "zhvi": 237737.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.89756854681005,
                    34.474497527461125
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.053894704368773,
                "regionName": "Wilmington, NC",
                "usdGrowth": 12026,
                "zhvi": 399345
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -83.80852285569006,
                    39.414858079390186
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.197608655194104,
                "regionName": "Wilmington, OH",
                "usdGrowth": 6310,
                "zhvi": 199864.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -77.91797800174125,
                    35.706254767762594
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -2.0492180703423726,
                "regionName": "Wilson, NC",
                "usdGrowth": -3929,
                "zhvi": 190804.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -78.4695497990726,
                    39.273535820506396
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.2780227510449746,
                "regionName": "Winchester, VA",
                "usdGrowth": 4255,
                "zhvi": 335216
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -96.995592,
                    37.239748999999996
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.436304984308156,
                "regionName": "Winfield, KS",
                "usdGrowth": 3724,
                "zhvi": 109928.66666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -118.11094271518002,
                    41.40692185964409
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.134521203481185,
                "regionName": "Winnemucca, NV",
                "usdGrowth": 7135,
                "zhvi": 337324.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -91.78081304935269,
                    43.98772282912794
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.4228488792069243,
                "regionName": "Winona, MN",
                "usdGrowth": 5566,
                "zhvi": 231589.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.34602535537711,
                    36.07722295222477
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.290003403022735,
                "regionName": "Winston, NC",
                "usdGrowth": 7910,
                "zhvi": 243498.66666666666
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -90.04158336139143,
                    44.455378964763526
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.807776658494149,
                "regionName": "Wisconsin Rapids, WI",
                "usdGrowth": 3100,
                "zhvi": 172736.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.26283044786844,
                    36.42316318169704
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8559809084542183,
                "regionName": "Woodward, OK",
                "usdGrowth": 2502,
                "zhvi": 135805.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.88844832732684,
                    40.82925851754426
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 15.200910326243655,
                "regionName": "Wooster, OH",
                "usdGrowth": 60909,
                "zhvi": 419871.3333333333
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -71.92366272029417,
                    42.223473516539066
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -1.0234370544240985,
                "regionName": "Worcester, MA",
                "usdGrowth": -4270,
                "zhvi": 416041.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -95.75329576461849,
                    43.6743462107047
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.6325907988469566,
                "regionName": "Worthington, MN",
                "usdGrowth": 4790,
                "zhvi": 183625
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -120.7380125994377,
                    46.45738486431146
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.3293688407042579,
                "regionName": "Yakima, WA",
                "usdGrowth": 1106,
                "zhvi": 336552.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -97.39467634563059,
                    43.00924485393429
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.9931948904692955,
                "regionName": "Yankton, SD",
                "usdGrowth": 7272,
                "zhvi": 245917
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -76.73040130692789,
                    39.92100890248995
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 0.679453601880255,
                "regionName": "York, PA",
                "usdGrowth": 1771,
                "zhvi": 261640.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -80.56692567757274,
                    41.2392284168759
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.8176166420518007,
                "regionName": "Youngstown, OH",
                "usdGrowth": 2668,
                "zhvi": 147627.33333333334
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -121.52262855833071,
                    39.149337453878786
                ],
                "type": "Point"
            },
            "properties": {
                "growth": -0.4131463141434222,
                "regionName": "Yuba City, CA",
                "usdGrowth": -1850,
                "zhvi": 440384.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -113.90666743173632,
                    32.76895712125094
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 1.9586756049754832,
                "regionName": "Yuma, AZ",
                "usdGrowth": 5268,
                "zhvi": 271663.6666666667
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -81.9436327460206,
                    39.96575964020696
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 2.0847588065534444,
                "regionName": "Zanesville, OH",
                "usdGrowth": 3601,
                "zhvi": 173750
            },
            "type": "Feature"
        },
        {
            "geometry": {
                "coordinates": [
                    -99.16987151534184,
                    27.00156391133992
                ],
                "type": "Point"
            },
            "properties": {
                "growth": 3.0057692257556736,
                "regionName": "Zapata, TX",
                "usdGrowth": 3781,
                "zhvi": 127150.66666666667
            },
            "type": "Feature"
        }
    ],
    "type": "FeatureCollection"
},
    }
  },
  mounted() {
    // axios.get("/api/regions/all", { params: regionRequestParams[this.timeRange] })
    // .then(res => {
    //   this.mapData = res.data.response.geoJson;
    // })
  }
}
</script>
<style scoped>
  button {
    padding: 10px 20px;
    background-color: #fff;
    border: 1px solid #efefef;
    border-radius: 0px;
  }
</style>
