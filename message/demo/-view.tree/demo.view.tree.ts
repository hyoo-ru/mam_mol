namespace $ { export class $mol_message_demo extends $mol_demo_small {

	/**
	 *  ```
	 *  title @ \Generic user message
	 *  ```
	 **/
	title() {
		return this.$.$mol_locale.text( "$mol_message_demo_title" )
	}

	/**
	 *  ```
	 *  sub /
	 *  	<= Message_short
	 *  	<= Message_long
	 *  ```
	 **/
	sub() {
		return [this.Message_short() , this.Message_long()] as readonly any[]
	}

	/**
	 *  ```
	 *  Message_short $mol_message
	 *  	name \Jin
	 *  	moment <= created
	 *  	avatar \https://avatars3.githubusercontent.com/u/442988?v=4
	 *  	avatar_link \https://github.com/nin-jin
	 *  	text \Hello, **everybody!**
	 *  ```
	 **/
	@ $mol_mem
	Message_short() {
		return (( obj )=>{
			obj.name = () => "Jin"
			obj.moment = () => this.created()
			obj.avatar = () => "https://avatars3.githubusercontent.com/u/442988?v=4"
			obj.avatar_link = () => "https://github.com/nin-jin"
			obj.text = () => "Hello, **everybody!**"
			return obj
		})( new this.$.$mol_message(  ) )
	}

	/**
	 *  ```
	 *  created $mol_time_moment
	 *  ```
	 **/
	@ $mol_mem
	created() {
		return (( obj )=>{
			return obj
		})( new this.$.$mol_time_moment(  ) )
	}

	/**
	 *  ```
	 *  Message_long $mol_message
	 *  	name \Great Teacher Onizuka
	 *  	moment <= created
	 *  	avatar_link \https://en.wikipedia.org/wiki/Great_Teacher_Onizuka
	 *  	text \The story focuses on 22-year-old ex-[bōsōzoku](https://en.wikipedia.org/wiki/Bōsōzoku) member Eikichi Onizuka, who becomes a teacher at a private middle school, Holy Forest Academy, in [Tokyo](https://en.wikipedia.org/wiki/Tokyo), [Japan](https://en.wikipedia.org/wiki/Japan). It won the 1998 [Kodansha Manga Award](https://en.wikipedia.org/wiki/Kodansha_Manga_Award) for shōnen and is a continuation of Tohru Fujisawa's other manga series [Shonan Junai Gumi](https://en.wikipedia.org/wiki/Shonan_Junai_Gumi) (lit. "Shōnan True Love Group") and Bad Company, both of which focus on the life of Onizuka before he becomes a teacher in Great Teacher Onizuka.
	 *  ```
	 **/
	@ $mol_mem
	Message_long() {
		return (( obj )=>{
			obj.name = () => "Great Teacher Onizuka"
			obj.moment = () => this.created()
			obj.avatar_link = () => "https://en.wikipedia.org/wiki/Great_Teacher_Onizuka"
			obj.text = () => "The story focuses on 22-year-old ex-[bōsōzoku](https://en.wikipedia.org/wiki/Bōsōzoku) member Eikichi Onizuka, who becomes a teacher at a private middle school, Holy Forest Academy, in [Tokyo](https://en.wikipedia.org/wiki/Tokyo), [Japan](https://en.wikipedia.org/wiki/Japan). It won the 1998 [Kodansha Manga Award](https://en.wikipedia.org/wiki/Kodansha_Manga_Award) for shōnen and is a continuation of Tohru Fujisawa's other manga series [Shonan Junai Gumi](https://en.wikipedia.org/wiki/Shonan_Junai_Gumi) (lit. \"Shōnan True Love Group\") and Bad Company, both of which focus on the life of Onizuka before he becomes a teacher in Great Teacher Onizuka."
			return obj
		})( new this.$.$mol_message(  ) )
	}

} }
