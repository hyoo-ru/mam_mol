# $mol_atom

Atom - is a reactive container. It computes his value by given function, watching its dependencies. If dependencies is being changed, then it updates his value. Updating proceeds in cascade style, deferrable, when needed. If a returned value would be a newly created  [$mol_object](../object), then it would be destroyed, when the atom for one reason or another (updating or destroying) would lose the link to it.

Instead of straight working with atoms, it recommends to use decorator [$mol_mem](../mem).
