namespace $ {

	export function $mol_fiber_warp() {
		while( $mol_fiber.queue.length ) {
			$mol_fiber.tick()
		}
		$mol_fiber.tick()
	}

}
