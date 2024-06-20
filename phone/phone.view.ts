namespace $.$$ {
	
	export const $mol_phone_formats: Record< string, string > = {
		
		// Common
		'': '+___________',
		
		// North America
		'1': '+_ (___) ___-__-__ ', // United States & Canada
		
		// Africa
		'27': '+__ (__) ___-__-__ ', // South Africa
		'212': '+___ (___) __-__-__ ', // Morocco
		'253': '+___ (__) __-__-__ ', // Djibouti
		'254': '+___ (___) __-__-__ ', // Kenya
		
		// Europe
		'30': '+__ (___) ___-__-__ ', // Greece
		'31': '+__ (__) ____ ____ ', // Netherlands
		'32': '+__ (___) __-__-__ ', // Belgium
		'33': '+__ _ __-__-__-__ ', // France
		'34': '+__ ___-___-___ ', // Spain
		'36': '+__ __ ___ ___ ', // Hungary
		'351': '+___ ___ ___ ___ ', // Portugal
		'353': '+___ _____ ', // Ireland
		'354': '+___ ___ __ __ ', // Iceland
		'358': '+___ (___) _ ___-___ ', // Finland
		'380': '+___ (__) ___ __ __ ', // Ukraine
		'39': '+__ (___) ___-__-__ ', // Italy
		'40': '+__-___-___-___ ', // Romania
		'41': '+__ (__) ___-__-__ ', // Switzerland
		'44': '+__ (___) ____ ____ ', // United Kingdom
		'45': '+__ __-__-__-__ ', // Denmark
		'46': '+__ ___-___ __ __ ', // Sweden
		'47': '+__ __-__-__-__ ', // Norway
		'48': '+__ (____) __-__-__ ', // Poland
		'49': '+__ (__) ___-__-__ ', // Germany
		
		// Central America
		'52': '+__ ___ ___ ____ ', // Mexico
		
		// Asia & Oceania
		'60': '+__ (__) ____-____ ', // Malaysia
		'61': '+__ (___) ___-___ ', // Australia
		'63': '+__ (___) ___-__-__ ', // Philippines
		'64': '+__ (__) ___-__-__ ', // New Zealand
		'65': '+__ ____-____ ', // Singapore
		'66': '+__ ____-____ ', // Thailand
		'7': '+_ (___) ___-__-__ ', // Russia
		'81': '+__ (__) ___-__-__ ', // Japan
		'82': '+__ (___) ___-__-__ ', // South Korea
		'86': '+__ (___) ____-____ ', // China
		'90': '+__ (___) ___-__-__ ', // Turkey
		'91': '+__ ____-____ ', // India
		'92': '+__ (__) ____-____ ', // Pakistan
		'94': '+__ (___) ___-___ ', // Sri Lanka
		'98': '+__ (___) ___-__-__ ', // Iran
		
	}
	
	export class $mol_phone extends $.$mol_phone {
		
		mask( val: string ) {
			return $mol_phone_formats[ val.slice( 0, 3 ) ]
				|| $mol_phone_formats[ val.slice( 0, 2 ) ]
				|| $mol_phone_formats[ val.slice( 0, 1 ) ]
				|| $mol_phone_formats[ '' ]
		}
		
	}
	
}
