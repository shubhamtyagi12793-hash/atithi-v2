// ─── Tithi Address Data ───────────────────────────────────────────────────────
// Structure: Country → State/Province → { City: ZIP/PIN }
// ZIP codes are representative central codes — editable by user if needed.

export const ADDRESS_DATA = {

  // ── United States ────────────────────────────────────────────────────────────
  'United States': {
    'Alabama':              { 'Birmingham': '35203', 'Montgomery': '36104', 'Huntsville': '35801', 'Mobile': '36602', 'Tuscaloosa': '35401', 'Hoover': '35244' },
    'Alaska':               { 'Anchorage': '99501', 'Fairbanks': '99701', 'Juneau': '99801', 'Sitka': '99835' },
    'Arizona':              { 'Phoenix': '85001', 'Tucson': '85701', 'Mesa': '85201', 'Chandler': '85224', 'Scottsdale': '85251', 'Gilbert': '85233', 'Tempe': '85281', 'Glendale': '85301' },
    'Arkansas':             { 'Little Rock': '72201', 'Fort Smith': '72901', 'Fayetteville': '72701', 'Springdale': '72764', 'Jonesboro': '72401' },
    'California':           { 'Los Angeles': '90001', 'San Francisco': '94102', 'San Diego': '92101', 'San Jose': '95101', 'Sacramento': '95814', 'Fresno': '93701', 'Oakland': '94601', 'Irvine': '92602', 'Santa Ana': '92701', 'Anaheim': '92801', 'Bakersfield': '93301', 'Riverside': '92501', 'Stockton': '95201', 'Fremont': '94536', 'San Bernardino': '92401', 'Modesto': '95351', 'Santa Rosa': '95401', 'Oxnard': '93030', 'Fontana': '92335', 'Moreno Valley': '92553', 'Long Beach': '90801', 'Glendale': '91201', 'Santa Clarita': '91350', 'Garden Grove': '92840', 'Oceanside': '92054', 'Rancho Cucamonga': '91701', 'Corona': '92877', 'Elk Grove': '95624', 'Hayward': '94541', 'Pomona': '91766', 'Escondido': '92025', 'Sunnyvale': '94085', 'Pasadena': '91101', 'Palo Alto': '94301', 'Mountain View': '94041', 'Cupertino': '95014', 'Santa Clara': '95050', 'Berkeley': '94701' },
    'Colorado':             { 'Denver': '80201', 'Colorado Springs': '80901', 'Aurora': '80010', 'Fort Collins': '80521', 'Lakewood': '80214', 'Thornton': '80229', 'Arvada': '80001', 'Westminster': '80030', 'Boulder': '80301', 'Pueblo': '81001', 'Centennial': '80112', 'Highlands Ranch': '80126' },
    'Connecticut':          { 'Bridgeport': '06601', 'New Haven': '06501', 'Hartford': '06101', 'Stamford': '06901', 'Waterbury': '06701', 'Norwalk': '06850', 'Greenwich': '06830' },
    'Delaware':             { 'Wilmington': '19801', 'Dover': '19901', 'Newark': '19711', 'Middletown': '19709' },
    'District of Columbia': { 'Washington DC': '20001' },
    'Florida':              { 'Miami': '33101', 'Orlando': '32801', 'Tampa': '33601', 'Jacksonville': '32099', 'St. Petersburg': '33701', 'Hialeah': '33010', 'Tallahassee': '32301', 'Fort Lauderdale': '33301', 'Pembroke Pines': '33024', 'Hollywood': '33019', 'Gainesville': '32601', 'Coral Springs': '33065', 'Cape Coral': '33904', 'Clearwater': '33755', 'Boca Raton': '33431', 'Lakeland': '33801', 'West Palm Beach': '33401', 'Miramar': '33023', 'Pompano Beach': '33060', 'Naples': '34102', 'Sarasota': '34230' },
    'Georgia':              { 'Atlanta': '30301', 'Columbus': '31901', 'Savannah': '31401', 'Augusta': '30901', 'Athens': '30601', 'Sandy Springs': '30328', 'Macon': '31201', 'Roswell': '30075', 'Albany': '31701', 'Johns Creek': '30022', 'Alpharetta': '30004' },
    'Hawaii':               { 'Honolulu': '96801', 'Pearl City': '96782', 'Hilo': '96720', 'Kailua': '96734', 'Waipahu': '96797' },
    'Idaho':                { 'Boise': '83701', 'Nampa': '83651', 'Meridian': '83642', 'Idaho Falls': '83401', 'Pocatello': '83201', 'Coeur d\'Alene': '83814' },
    'Illinois':             { 'Chicago': '60601', 'Aurora': '60505', 'Naperville': '60540', 'Joliet': '60431', 'Rockford': '61101', 'Springfield': '62701', 'Elgin': '60120', 'Peoria': '61601', 'Champaign': '61820', 'Waukegan': '60085', 'Evanston': '60201', 'Schaumburg': '60173' },
    'Indiana':              { 'Indianapolis': '46201', 'Fort Wayne': '46801', 'Evansville': '47701', 'South Bend': '46601', 'Carmel': '46032', 'Bloomington': '47401', 'Hammond': '46320', 'Gary': '46401', 'Lafayette': '47901', 'Muncie': '47302' },
    'Iowa':                 { 'Des Moines': '50301', 'Cedar Rapids': '52401', 'Davenport': '52801', 'Sioux City': '51101', 'Iowa City': '52240', 'Waterloo': '50701', 'Ames': '50010' },
    'Kansas':               { 'Wichita': '67201', 'Overland Park': '66204', 'Kansas City': '66101', 'Olathe': '66051', 'Topeka': '66601', 'Lawrence': '66044', 'Shawnee': '66203' },
    'Kentucky':             { 'Louisville': '40201', 'Lexington': '40501', 'Bowling Green': '42101', 'Owensboro': '42301', 'Covington': '41011', 'Richmond': '40475', 'Florence': '41042' },
    'Louisiana':            { 'New Orleans': '70112', 'Baton Rouge': '70801', 'Shreveport': '71101', 'Lafayette': '70501', 'Lake Charles': '70601', 'Kenner': '70062', 'Bossier City': '71111' },
    'Maine':                { 'Portland': '04101', 'Lewiston': '04240', 'Bangor': '04401', 'South Portland': '04106', 'Auburn': '04210' },
    'Maryland':             { 'Baltimore': '21201', 'Columbia': '21044', 'Germantown': '20874', 'Silver Spring': '20901', 'Waldorf': '20601', 'Frederick': '21701', 'Rockville': '20850', 'Bethesda': '20814', 'Gaithersburg': '20877', 'Ellicott City': '21041', 'Annapolis': '21401' },
    'Massachusetts':        { 'Boston': '02101', 'Worcester': '01601', 'Springfield': '01101', 'Cambridge': '02138', 'Lowell': '01850', 'Brockton': '02301', 'New Bedford': '02740', 'Quincy': '02169', 'Lynn': '01901', 'Newton': '02458', 'Somerville': '02143', 'Lawrence': '01840', 'Framingham': '01701', 'Waltham': '02451' },
    'Michigan':             { 'Detroit': '48201', 'Grand Rapids': '49501', 'Warren': '48089', 'Sterling Heights': '48310', 'Ann Arbor': '48103', 'Lansing': '48901', 'Flint': '48501', 'Dearborn': '48120', 'Livonia': '48150', 'Westland': '48185', 'Troy': '48083', 'Farmington Hills': '48331', 'Kalamazoo': '49001', 'Wyoming': '49501', 'Southfield': '48075' },
    'Minnesota':            { 'Minneapolis': '55401', 'Saint Paul': '55101', 'Rochester': '55901', 'Duluth': '55801', 'Bloomington': '55420', 'Brooklyn Park': '55443', 'Plymouth': '55441', 'Maple Grove': '55311', 'Woodbury': '55125', 'St. Cloud': '56301', 'Eagan': '55122', 'Eden Prairie': '55344' },
    'Mississippi':          { 'Jackson': '39201', 'Gulfport': '39501', 'Southaven': '38671', 'Hattiesburg': '39401', 'Biloxi': '39530', 'Meridian': '39301' },
    'Missouri':             { 'Kansas City': '64101', 'St. Louis': '63101', 'Springfield': '65801', 'Columbia': '65201', 'Independence': '64050', 'Lee\'s Summit': '64063', 'O\'Fallon': '63366', 'St. Joseph': '64501', 'St. Charles': '63301', 'Blue Springs': '64014', 'Joplin': '64801' },
    'Montana':              { 'Billings': '59101', 'Missoula': '59801', 'Great Falls': '59401', 'Bozeman': '59715', 'Butte': '59701', 'Helena': '59601' },
    'Nebraska':             { 'Omaha': '68101', 'Lincoln': '68501', 'Bellevue': '68005', 'Grand Island': '68801', 'Kearney': '68845', 'Fremont': '68025' },
    'Nevada':               { 'Las Vegas': '89101', 'Henderson': '89002', 'Reno': '89501', 'North Las Vegas': '89030', 'Sparks': '89431', 'Carson City': '89701', 'Summerlin': '89135' },
    'New Hampshire':        { 'Manchester': '03101', 'Nashua': '03060', 'Concord': '03301', 'Derry': '03038', 'Dover': '03820', 'Rochester': '03867', 'Portsmouth': '03801' },
    'New Jersey':           { 'Newark': '07101', 'Jersey City': '07301', 'Paterson': '07501', 'Elizabeth': '07201', 'Edison': '08817', 'Woodbridge': '07095', 'Lakewood': '08701', 'Toms River': '08753', 'Hamilton': '08610', 'Trenton': '08601', 'Clifton': '07011', 'Camden': '08101', 'Cherry Hill': '08002', 'Passaic': '07055', 'Union City': '07087', 'Princeton': '08542', 'Hoboken': '07030' },
    'New Mexico':           { 'Albuquerque': '87101', 'Las Cruces': '88001', 'Rio Rancho': '87124', 'Santa Fe': '87501', 'Roswell': '88201', 'Farmington': '87401' },
    'New York':             { 'New York City': '10001', 'Brooklyn': '11201', 'Queens': '11101', 'Bronx': '10451', 'Staten Island': '10301', 'Buffalo': '14201', 'Rochester': '14601', 'Yonkers': '10701', 'Syracuse': '13201', 'Albany': '12201', 'New Rochelle': '10801', 'Mount Vernon': '10550', 'Schenectady': '12301', 'Utica': '13501', 'White Plains': '10601', 'Hempstead': '11550', 'Binghamton': '13901', 'Freeport': '11520', 'Long Island City': '11101', 'Jamaica': '11430' },
    'North Carolina':       { 'Charlotte': '28201', 'Raleigh': '27601', 'Greensboro': '27401', 'Durham': '27701', 'Winston-Salem': '27101', 'Fayetteville': '28301', 'Cary': '27511', 'Wilmington': '28401', 'High Point': '27260', 'Asheville': '28801', 'Concord': '28025', 'Chapel Hill': '27514' },
    'North Dakota':         { 'Fargo': '58101', 'Bismarck': '58501', 'Grand Forks': '58201', 'Minot': '58701', 'West Fargo': '58078' },
    'Ohio':                 { 'Columbus': '43201', 'Cleveland': '44101', 'Cincinnati': '45201', 'Toledo': '43601', 'Akron': '44301', 'Dayton': '45401', 'Parma': '44129', 'Canton': '44701', 'Lorain': '44052', 'Hamilton': '45011', 'Youngstown': '44501', 'Springfield': '45501', 'Dublin': '43016', 'Westerville': '43081', 'Mentor': '44060' },
    'Oklahoma':             { 'Oklahoma City': '73101', 'Tulsa': '74101', 'Norman': '73069', 'Broken Arrow': '74011', 'Lawton': '73501', 'Edmond': '73003', 'Moore': '73160', 'Midwest City': '73110', 'Stillwater': '74074' },
    'Oregon':               { 'Portland': '97201', 'Salem': '97301', 'Eugene': '97401', 'Gresham': '97030', 'Hillsboro': '97123', 'Beaverton': '97005', 'Bend': '97701', 'Medford': '97501', 'Springfield': '97477', 'Corvallis': '97331' },
    'Pennsylvania':         { 'Philadelphia': '19102', 'Pittsburgh': '15201', 'Allentown': '18101', 'Erie': '16501', 'Reading': '19601', 'Scranton': '18503', 'Bethlehem': '18015', 'Lancaster': '17601', 'Harrisburg': '17101', 'York': '17401', 'Altoona': '16601', 'State College': '16801', 'Wilkes-Barre': '18701' },
    'Rhode Island':         { 'Providence': '02901', 'Cranston': '02920', 'Warwick': '02886', 'Pawtucket': '02860', 'East Providence': '02914', 'Woonsocket': '02895' },
    'South Carolina':       { 'Columbia': '29201', 'Charleston': '29401', 'North Charleston': '29405', 'Mount Pleasant': '29464', 'Rock Hill': '29730', 'Greenville': '29601', 'Summerville': '29483', 'Sumter': '29150', 'Goose Creek': '29445', 'Hilton Head Island': '29926', 'Florence': '29501', 'Spartanburg': '29301' },
    'South Dakota':         { 'Sioux Falls': '57101', 'Rapid City': '57701', 'Aberdeen': '57401', 'Brookings': '57006', 'Watertown': '57201' },
    'Tennessee':            { 'Nashville': '37201', 'Memphis': '38101', 'Knoxville': '37901', 'Chattanooga': '37401', 'Clarksville': '37040', 'Murfreesboro': '37127', 'Franklin': '37064', 'Jackson': '38301', 'Johnson City': '37601', 'Bartlett': '38135', 'Brentwood': '37027', 'Hendersonville': '37075' },
    'Texas':                { 'Houston': '77001', 'San Antonio': '78201', 'Dallas': '75201', 'Austin': '78701', 'Fort Worth': '76101', 'El Paso': '79901', 'Arlington': '76001', 'Corpus Christi': '78401', 'Plano': '75023', 'Laredo': '78040', 'Lubbock': '79401', 'Garland': '75040', 'Irving': '75061', 'Amarillo': '79101', 'Frisco': '75034', 'McKinney': '75069', 'Killeen': '76541', 'Waco': '76701', 'Carrollton': '75006', 'Denton': '76201', 'Midland': '79701', 'Mesquite': '75149', 'Abilene': '79601', 'Pasadena': '77501', 'Tyler': '75701', 'Grand Prairie': '75050', 'Round Rock': '78664', 'Beaumont': '77701', 'Richardson': '75080', 'Allen': '75002', 'Lewisville': '75019', 'Odessa': '79761', 'Sugar Land': '77478' },
    'Utah':                 { 'Salt Lake City': '84101', 'West Valley City': '84119', 'Provo': '84601', 'West Jordan': '84084', 'Orem': '84057', 'Sandy': '84070', 'Ogden': '84401', 'St. George': '84770', 'Layton': '84041', 'Taylorsville': '84129', 'South Jordan': '84095', 'Lehi': '84043', 'Logan': '84321' },
    'Vermont':              { 'Burlington': '05401', 'South Burlington': '05403', 'Rutland': '05701', 'Barre': '05641', 'Montpelier': '05601', 'Winooski': '05404' },
    'Virginia':             { 'Virginia Beach': '23450', 'Norfolk': '23501', 'Chesapeake': '23320', 'Richmond': '23219', 'Newport News': '23601', 'Alexandria': '22314', 'Hampton': '23669', 'Roanoke': '24011', 'Portsmouth': '23704', 'Suffolk': '23434', 'Lynchburg': '24501', 'Harrisonburg': '22801', 'Charlottesville': '22901', 'Arlington': '22201', 'McLean': '22101', 'Tysons': '22102', 'Fairfax': '22030', 'Reston': '20190', 'Ashburn': '20147', 'Herndon': '20170' },
    'Washington':           { 'Seattle': '98101', 'Spokane': '99201', 'Tacoma': '98401', 'Vancouver': '98660', 'Bellevue': '98004', 'Kent': '98031', 'Everett': '98201', 'Renton': '98055', 'Spokane Valley': '99206', 'Federal Way': '98003', 'Kirkland': '98033', 'Bellingham': '98225', 'Kennewick': '99336', 'Yakima': '98901', 'Redmond': '98052', 'Marysville': '98270', 'Sammamish': '98075', 'Shoreline': '98133', 'Richland': '99352', 'Lakewood': '98499', 'Burien': '98148', 'Olympia': '98501', 'Bothell': '98011', 'Issaquah': '98027', 'Pasco': '99301' },
    'West Virginia':        { 'Charleston': '25301', 'Huntington': '25701', 'Morgantown': '26501', 'Parkersburg': '26101', 'Wheeling': '26003', 'Weirton': '26062' },
    'Wisconsin':            { 'Milwaukee': '53201', 'Madison': '53701', 'Green Bay': '54301', 'Kenosha': '53140', 'Racine': '53401', 'Appleton': '54911', 'Waukesha': '53186', 'Eau Claire': '54701', 'Oshkosh': '54901', 'Janesville': '53545', 'West Allis': '53214', 'La Crosse': '54601' },
    'Wyoming':              { 'Cheyenne': '82001', 'Casper': '82601', 'Laramie': '82070', 'Gillette': '82716', 'Rock Springs': '82901' },
  },

  // ── India ────────────────────────────────────────────────────────────────────
  'India': {
    'Andhra Pradesh':       { 'Visakhapatnam': '530001', 'Vijayawada': '520001', 'Guntur': '522001', 'Nellore': '524001', 'Kurnool': '518001', 'Tirupati': '517501', 'Rajahmundry': '533101', 'Kakinada': '533001', 'Anantapur': '515001', 'Kadapa': '516001' },
    'Arunachal Pradesh':    { 'Itanagar': '791111', 'Naharlagun': '791110', 'Pasighat': '791102', 'Tezpur': '784001' },
    'Assam':                { 'Guwahati': '781001', 'Silchar': '788001', 'Dibrugarh': '786001', 'Jorhat': '785001', 'Nagaon': '782001', 'Tinsukia': '786125', 'Tezpur': '784001' },
    'Bihar':                { 'Patna': '800001', 'Gaya': '823001', 'Muzaffarpur': '842001', 'Bhagalpur': '812001', 'Darbhanga': '846001', 'Arrah': '802301', 'Begusarai': '851101', 'Purnia': '854301' },
    'Chandigarh':           { 'Chandigarh': '160001', 'Mohali': '160055', 'Panchkula': '134109' },
    'Chhattisgarh':         { 'Raipur': '492001', 'Bhilai': '490001', 'Bilaspur': '495001', 'Korba': '495677', 'Durg': '491001', 'Rajnandgaon': '491441', 'Jagdalpur': '494001' },
    'Delhi':                { 'New Delhi': '110001', 'South Delhi': '110017', 'North Delhi': '110007', 'East Delhi': '110091', 'West Delhi': '110018', 'Dwarka': '110075', 'Rohini': '110085', 'Pitampura': '110034', 'Noida (NCR)': '201301', 'Gurugram (NCR)': '122001', 'Faridabad (NCR)': '121001', 'Ghaziabad (NCR)': '201001' },
    'Goa':                  { 'Panaji': '403001', 'Margao': '403601', 'Vasco da Gama': '403802', 'Mapusa': '403507', 'Ponda': '403401', 'Calangute': '403516' },
    'Gujarat':              { 'Ahmedabad': '380001', 'Surat': '395001', 'Vadodara': '390001', 'Rajkot': '360001', 'Bhavnagar': '364001', 'Jamnagar': '361001', 'Gandhinagar': '382001', 'Junagadh': '362001', 'Anand': '388001', 'Nadiad': '387001', 'Morbi': '363641', 'Bharuch': '392001' },
    'Haryana':              { 'Faridabad': '121001', 'Gurugram': '122001', 'Panipat': '132103', 'Ambala': '134001', 'Yamunanagar': '135001', 'Rohtak': '124001', 'Hisar': '125001', 'Karnal': '132001', 'Sonipat': '131001', 'Panchkula': '134109' },
    'Himachal Pradesh':     { 'Shimla': '171001', 'Solan': '173212', 'Dharamshala': '176215', 'Mandi': '175001', 'Baddi': '173205', 'Kullu': '175101', 'Manali': '175131' },
    'Jharkhand':            { 'Ranchi': '834001', 'Jamshedpur': '831001', 'Dhanbad': '826001', 'Bokaro': '827001', 'Deoghar': '814112', 'Hazaribagh': '825301', 'Giridih': '815301' },
    'Karnataka':            { 'Bengaluru': '560001', 'Mysuru': '570001', 'Hubli': '580020', 'Mangaluru': '575001', 'Belgaum': '590001', 'Gulbarga': '585101', 'Davangere': '577001', 'Bellary': '583101', 'Bijapur': '586101', 'Shimoga': '577201', 'Tumkur': '572101', 'Raichur': '584101', 'Bidar': '585401', 'Hospet': '583201', 'Udupi': '576101', 'Dharwad': '580001' },
    'Kerala':               { 'Thiruvananthapuram': '695001', 'Kochi': '682001', 'Kozhikode': '673001', 'Kollam': '691001', 'Thrissur': '680001', 'Alappuzha': '688001', 'Palakkad': '678001', 'Kottayam': '686001', 'Malappuram': '676505', 'Kannur': '670001', 'Kasaragod': '671121' },
    'Madhya Pradesh':       { 'Indore': '452001', 'Bhopal': '462001', 'Jabalpur': '482001', 'Gwalior': '474001', 'Ujjain': '456001', 'Sagar': '470001', 'Dewas': '455001', 'Satna': '485001', 'Ratlam': '457001', 'Rewa': '486001', 'Burhanpur': '450331', 'Morena': '476001' },
    'Maharashtra':          { 'Mumbai': '400001', 'Pune': '411001', 'Nagpur': '440001', 'Nashik': '422001', 'Thane': '400601', 'Aurangabad': '431001', 'Solapur': '413001', 'Kolhapur': '416001', 'Amravati': '444601', 'Nanded': '431601', 'Kalyan': '421301', 'Navi Mumbai': '400703', 'Pimpri-Chinchwad': '411017', 'Vasai-Virar': '401201', 'Bhiwandi': '421302', 'Malegaon': '423203', 'Ulhasnagar': '421003', 'Latur': '413512', 'Dhule': '424001', 'Ahmednagar': '414001', 'Sangli': '416416', 'Satara': '415001', 'Panvel': '410206' },
    'Manipur':              { 'Imphal': '795001', 'Thoubal': '795138', 'Churachandpur': '795128', 'Bishnupur': '795126' },
    'Meghalaya':            { 'Shillong': '793001', 'Tura': '794001', 'Nongstoin': '793119' },
    'Mizoram':              { 'Aizawl': '796001', 'Lunglei': '796701', 'Champhai': '796321' },
    'Nagaland':             { 'Kohima': '797001', 'Dimapur': '797112', 'Mokokchung': '798601' },
    'Odisha':               { 'Bhubaneswar': '751001', 'Cuttack': '753001', 'Rourkela': '769001', 'Brahmapur': '760001', 'Sambalpur': '768001', 'Puri': '752001', 'Balasore': '756001', 'Baripada': '757001', 'Bhadrak': '756100' },
    'Punjab':               { 'Ludhiana': '141001', 'Amritsar': '143001', 'Jalandhar': '144001', 'Patiala': '147001', 'Bathinda': '151001', 'Mohali': '160055', 'Pathankot': '145001', 'Hoshiarpur': '146001', 'Kapurthala': '144601', 'Moga': '142001', 'Phagwara': '144401', 'Firozpur': '152001', 'Fatehgarh Sahib': '140406', 'Rupnagar': '140001' },
    'Rajasthan':            { 'Jaipur': '302001', 'Jodhpur': '342001', 'Kota': '324001', 'Bikaner': '334001', 'Ajmer': '305001', 'Udaipur': '313001', 'Bhilwara': '311001', 'Alwar': '301001', 'Bharatpur': '321001', 'Sikar': '332001', 'Sri Ganganagar': '335001', 'Pali': '306001', 'Nagaur': '341001', 'Chittorgarh': '312001', 'Barmer': '344001' },
    'Sikkim':               { 'Gangtok': '737101', 'Namchi': '737126', 'Mangan': '737116', 'Gyalshing': '737111' },
    'Tamil Nadu':           { 'Chennai': '600001', 'Coimbatore': '641001', 'Madurai': '625001', 'Tiruchirappalli': '620001', 'Salem': '636001', 'Tirunelveli': '627001', 'Vellore': '632001', 'Erode': '638001', 'Thoothukudi': '628001', 'Dindigul': '624001', 'Thanjavur': '613001', 'Ranipet': '632401', 'Sivakasi': '626123', 'Karur': '639001', 'Udhagamandalam (Ooty)': '643001', 'Hosur': '635109', 'Nagercoil': '629001', 'Kanchipuram': '631501' },
    'Telangana':            { 'Hyderabad': '500001', 'Warangal': '506001', 'Nizamabad': '503001', 'Karimnagar': '505001', 'Ramagundam': '505208', 'Khammam': '507001', 'Mahbubnagar': '509001', 'Nalgonda': '508001', 'Adilabad': '504001', 'Suryapet': '508213', 'Siddipet': '502103', 'Mancherial': '504208' },
    'Tripura':              { 'Agartala': '799001', 'Dharmanagar': '799250', 'Udaipur': '799120', 'Kailasahar': '799277' },
    'Uttar Pradesh':        { 'Lucknow': '226001', 'Kanpur': '208001', 'Ghaziabad': '201001', 'Agra': '282001', 'Varanasi': '221001', 'Meerut': '250001', 'Allahabad': '211001', 'Bareilly': '243001', 'Aligarh': '202001', 'Moradabad': '244001', 'Saharanpur': '247001', 'Gorakhpur': '273001', 'Noida': '201301', 'Firozabad': '283203', 'Jhansi': '284001', 'Muzaffarnagar': '251001', 'Mathura': '281001', 'Rampur': '244901', 'Shahjahanpur': '242001', 'Farrukhabad': '209625', 'Ayodhya': '224001', 'Rae Bareli': '229001' },
    'Uttarakhand':          { 'Dehradun': '248001', 'Haridwar': '249401', 'Roorkee': '247667', 'Haldwani': '263139', 'Rudrapur': '263153', 'Kashipur': '244713', 'Rishikesh': '249201', 'Nainital': '263001' },
    'West Bengal':          { 'Kolkata': '700001', 'Howrah': '711101', 'Durgapur': '713201', 'Asansol': '713301', 'Siliguri': '734001', 'Malda': '732101', 'Bardhaman': '713101', 'Kharagpur': '721301', 'Haldia': '721607', 'Baharampur': '742101', 'Cooch Behar': '736101', 'Jalpaiguri': '735101' },
  },

  // ── United Kingdom ───────────────────────────────────────────────────────────
  'United Kingdom': {
    'England - London':     { 'Central London': 'EC1A 1BB', 'Westminster': 'SW1A 1AA', 'Kensington': 'W8 4PX', 'Camden': 'NW1 2DB', 'Islington': 'N1 9GU', 'Hackney': 'E8 1EA', 'Tower Hamlets': 'E1 6RF', 'Southwark': 'SE1 7PB', 'Lambeth': 'SE1 7JY', 'Greenwich': 'SE10 8XJ', 'Lewisham': 'SE13 7EQ', 'Croydon': 'CR0 1EA', 'Bromley': 'BR1 1DN', 'Ealing': 'W5 1BW', 'Hounslow': 'TW3 1LJ', 'Richmond': 'TW9 1TP', 'Wandsworth': 'SW18 2PU', 'Hammersmith': 'W6 9YA', 'Fulham': 'SW6 1AA', 'Chelsea': 'SW3 5ST', 'Canary Wharf': 'E14 5AB' },
    'England - South East': { 'Brighton': 'BN1 1BA', 'Oxford': 'OX1 1BP', 'Reading': 'RG1 1EA', 'Southampton': 'SO14 0LJ', 'Portsmouth': 'PO1 1BA', 'Canterbury': 'CT1 2EH', 'Guildford': 'GU1 3QP', 'Milton Keynes': 'MK9 2HP', 'Slough': 'SL1 1HP', 'Windsor': 'SL4 1LJ', 'Basingstoke': 'RG21 4EA' },
    'England - South West': { 'Bristol': 'BS1 1AA', 'Plymouth': 'PL1 1AA', 'Exeter': 'EX1 1AA', 'Bath': 'BA1 1AA', 'Bournemouth': 'BH1 1AA', 'Swindon': 'SN1 1AA', 'Cheltenham': 'GL50 1AA', 'Gloucester': 'GL1 1AA', 'Torquay': 'TQ1 1AA', 'Truro': 'TR1 1AA' },
    'England - Midlands':   { 'Birmingham': 'B1 1BB', 'Coventry': 'CV1 1AA', 'Leicester': 'LE1 1AA', 'Nottingham': 'NG1 1AA', 'Derby': 'DE1 1AA', 'Stoke-on-Trent': 'ST1 1AA', 'Wolverhampton': 'WV1 1AA', 'Walsall': 'WS1 1AA', 'Worcester': 'WR1 1AA', 'Shrewsbury': 'SY1 1AA', 'Lincoln': 'LN1 1AA', 'Northampton': 'NN1 1AA' },
    'England - North West': { 'Manchester': 'M1 1AA', 'Liverpool': 'L1 1AA', 'Leeds': 'LS1 1AA', 'Sheffield': 'S1 1AA', 'Bradford': 'BD1 1AA', 'Bolton': 'BL1 1AA', 'Blackpool': 'FY1 1AA', 'Preston': 'PR1 1AA', 'Stockport': 'SK1 1AA', 'Oldham': 'OL1 1AA', 'Rochdale': 'OL16 1AA', 'Burnley': 'BB11 1AA', 'Chester': 'CH1 1AA', 'Blackburn': 'BB1 1AA' },
    'England - North East': { 'Newcastle upon Tyne': 'NE1 1AA', 'Sunderland': 'SR1 1AA', 'Durham': 'DH1 1AA', 'Middlesbrough': 'TS1 1AA', 'York': 'YO1 1AA', 'Hull': 'HU1 1AA', 'Harrogate': 'HG1 1AA' },
    'Scotland':             { 'Edinburgh': 'EH1 1AA', 'Glasgow': 'G1 1AA', 'Aberdeen': 'AB10 1AA', 'Dundee': 'DD1 1AA', 'Inverness': 'IV1 1AA', 'Stirling': 'FK8 1AA', 'Perth': 'PH1 1AA', 'St Andrews': 'KY16 9AA' },
    'Wales':                { 'Cardiff': 'CF10 1AA', 'Swansea': 'SA1 1AA', 'Newport': 'NP20 1AA', 'Bangor': 'LL57 1AA', 'Aberystwyth': 'SY23 1AA', 'Wrexham': 'LL11 1AA' },
    'Northern Ireland':     { 'Belfast': 'BT1 1AA', 'Derry': 'BT48 6AA', 'Lisburn': 'BT28 1AA', 'Armagh': 'BT61 7AA', 'Newry': 'BT35 6AA' },
  },

  // ── Canada ───────────────────────────────────────────────────────────────────
  'Canada': {
    'Alberta':              { 'Calgary': 'T2P 0A1', 'Edmonton': 'T5J 0N3', 'Red Deer': 'T4N 0A1', 'Lethbridge': 'T1J 0A1', 'St. Albert': 'T8N 0A1', 'Medicine Hat': 'T1A 0A1', 'Grande Prairie': 'T8V 0A1', 'Airdrie': 'T4B 0A1', 'Spruce Grove': 'T7X 0A1', 'Canmore': 'T1W 0A1', 'Banff': 'T1L 0A1' },
    'British Columbia':     { 'Vancouver': 'V5K 0A1', 'Victoria': 'V8W 0A1', 'Kelowna': 'V1Y 0A1', 'Abbotsford': 'V2S 0A1', 'Burnaby': 'V5C 0A1', 'Richmond': 'V6Y 0A1', 'Surrey': 'V3T 0A1', 'Kamloops': 'V2C 0A1', 'Langley': 'V3A 0A1', 'Nanaimo': 'V9R 0A1', 'North Vancouver': 'V7G 0A1', 'Prince George': 'V2L 0A1', 'Whistler': 'V0N 1B1' },
    'Manitoba':             { 'Winnipeg': 'R3C 0A1', 'Brandon': 'R7A 0A1', 'Steinbach': 'R5G 0A1', 'Thompson': 'R8N 0A1', 'Portage la Prairie': 'R1N 0A1' },
    'New Brunswick':        { 'Fredericton': 'E3A 0A1', 'Moncton': 'E1A 0A1', 'Saint John': 'E2K 0A1', 'Bathurst': 'E2A 0A1', 'Dieppe': 'E1A 0A1', 'Miramichi': 'E1N 0A1' },
    'Newfoundland':         { 'St. John\'s': 'A1A 0A1', 'Mount Pearl': 'A1N 0A1', 'Corner Brook': 'A2H 0A1', 'Conception Bay South': 'A1X 0A1', 'Grand Falls-Windsor': 'A2A 0A1' },
    'Nova Scotia':          { 'Halifax': 'B3J 0A1', 'Dartmouth': 'B2Y 0A1', 'Sydney': 'B1P 0A1', 'Truro': 'B2N 0A1', 'New Glasgow': 'B2H 0A1', 'Kentville': 'B4N 0A1' },
    'Ontario':              { 'Toronto': 'M5H 0A1', 'Ottawa': 'K1A 0A1', 'Mississauga': 'L5B 0A1', 'Brampton': 'L6X 0A1', 'Hamilton': 'L8R 0A1', 'London': 'N6A 0A1', 'Markham': 'L3P 0A1', 'Vaughan': 'L4H 0A1', 'Kitchener': 'N2G 0A1', 'Windsor': 'N9A 0A1', 'Oakville': 'L6J 0A1', 'Burlington': 'L7R 0A1', 'Greater Sudbury': 'P3A 0A1', 'Oshawa': 'L1H 0A1', 'Barrie': 'L4M 0A1', 'Kingston': 'K7K 0A1', 'Guelph': 'N1H 0A1', 'Cambridge': 'N1R 0A1', 'Waterloo': 'N2J 0A1', 'Niagara Falls': 'L2E 0A1', 'Thunder Bay': 'P7A 0A1', 'St. Catharines': 'L2R 0A1' },
    'Prince Edward Island': { 'Charlottetown': 'C1A 0A1', 'Summerside': 'C1N 0A1', 'Stratford': 'C1B 0A1', 'Cornwall': 'C0A 1H0' },
    'Quebec':               { 'Montreal': 'H2Y 0A1', 'Quebec City': 'G1R 0A1', 'Laval': 'H7A 0A1', 'Gatineau': 'J8T 0A1', 'Longueuil': 'J4G 0A1', 'Sherbrooke': 'J1H 0A1', 'Saguenay': 'G7H 0A1', 'Levis': 'G6V 0A1', 'Trois-Rivières': 'G8T 0A1', 'Terrebonne': 'J6W 0A1' },
    'Saskatchewan':         { 'Saskatoon': 'S7K 0A1', 'Regina': 'S4P 0A1', 'Prince Albert': 'S6V 0A1', 'Moose Jaw': 'S6H 0A1', 'Swift Current': 'S9H 0A1', 'Lloydminster': 'S9V 0A1', 'North Battleford': 'S9A 0A1' },
    'Territories':          { 'Whitehorse (Yukon)': 'Y1A 0A1', 'Yellowknife (NWT)': 'X1A 0A1', 'Iqaluit (Nunavut)': 'X0A 0H0' },
  },
};

/**
 * Get sorted list of states/provinces for a country.
 */
export function getStates(country) {
  if (!ADDRESS_DATA[country]) return [];
  return Object.keys(ADDRESS_DATA[country]).sort();
}

/**
 * Get sorted list of cities for a country + state.
 */
export function getCities(country, state) {
  if (!ADDRESS_DATA[country]?.[state]) return [];
  return Object.keys(ADDRESS_DATA[country][state]).sort();
}

/**
 * Get the representative ZIP/PIN for a city.
 */
export function getZip(country, state, city) {
  return ADDRESS_DATA[country]?.[state]?.[city] || '';
}
