declare namespace $ { }
export = $;
declare namespace $ {
    namespace $$ {
        let $$: typeof $;
    }
    type $mol_ambient_context = (typeof globalThis) & (typeof $.$$) & (typeof $);
    function $mol_ambient(this: $mol_ambient_context, overrides: Partial<$mol_ambient_context>): $mol_ambient_context;
}
declare namespace $ {
    namespace $$ { }
    class $mol_object {
        static $: $mol_ambient_context;
        readonly $: $mol_ambient_context;
        static make<Instance>(this: {
            new (): Instance;
        }, config: Partial<Instance>): Instance;
        static toString(): string;
        'object_owner()': any;
        object_owner(next?: any): any;
        'object_host()': any;
        object_host(next?: any): any;
        'object_field()': string;
        object_field(next?: string): string;
        object_id(next?: string): any;
        toString(): any;
        toJSON(): any;
        destructor(): void;
    }
}
declare namespace $ {
    function $mol_compare_any(a: any, b: any): boolean;
}
declare namespace $ {
    const $mol_conform_stack: any[];
    function $mol_conform<Target, Source>(target: Target, source: Source): Target;
    const $mol_conform_handlers: WeakMap<Object, (target: any, source: any) => any>;
    function $mol_conform_handler<Class>(cl: {
        new (...args: any[]): Class;
    }, handler: (target: Class, source: Class) => Class): void;
}
declare namespace $ {
    function $mol_fail(error: any): never;
}
declare namespace $ {
    function $mol_fail_hidden(error: any): never;
}
declare namespace $ {
    function $mol_log(path: any, ...values: any[]): void;
}
declare namespace $ {
    function $mol_log_context(next?: () => void): () => void;
}
declare namespace $ {
    function $mol_log_debug(next?: () => void): () => void;
}
declare namespace $ {
    var $mol_log_filter: (next?: string) => string;
}
declare namespace $ {
    function $mol_log_group<Task extends Function, This>(name: string, task: Task): Task;
}
declare namespace $ {
    class $mol_defer extends $mol_object {
        run: () => void;
        constructor(run: () => void);
        destructor(): void;
        static all: $mol_defer[];
        static timer: any;
        static scheduleNative: (handler: () => void) => any;
        static schedule(): void;
        static unschedule(): void;
        static add(defer: $mol_defer): void;
        static drop(defer: $mol_defer): void;
        static run(): void;
    }
}
declare namespace $ {
    var $mol_state_stack: Map<string, any>;
}
declare namespace $ {
    enum $mol_atom_status {
        obsolete = "obsolete",
        checking = "checking",
        pulling = "pulling",
        actual = "actual"
    }
    function $mol_atom_fence<Task extends () => any>(task: Task): any;
    class $mol_atom<Value = any> extends $mol_object {
        masters: Set<$mol_atom<any>> | null;
        slaves: Set<$mol_atom<any>> | null;
        status: $mol_atom_status;
        readonly handler: (next?: Value, force?: $mol_atom_force) => Value | void;
        'value()': Value | Error | undefined;
        constructor(id: string, handler?: (next?: Value, force?: $mol_atom_force) => Value | void);
        destructor(): void;
        unlink(): void;
        get(force?: $mol_atom_force): Value;
        actualize(force?: $mol_atom_force): void;
        pull(force?: $mol_atom_force): any;
        _next: Value | undefined;
        _ignore: Value | undefined;
        set(next: Value): Value;
        push(next_raw?: Value | Error): Value;
        obsolete_slaves(): void;
        check_slaves(): void;
        check(): void;
        obsolete(): void;
        lead(slave: $mol_atom<any>): void;
        dislead(slave: $mol_atom<any>): void;
        obey(master: $mol_atom<any>): void;
        disobey(master: $mol_atom<any>): void;
        disobey_all(): void;
        cache(next?: Value | Error): Error | Value;
        value(next?: Value, force?: $mol_atom_force): Value;
        static stack: $mol_atom<any>[];
        static updating: $mol_atom<any>[];
        static reaping: Set<$mol_atom<any>>;
        static scheduled: boolean;
        static actualize(atom: $mol_atom<any>): void;
        static reap(atom: $mol_atom<any>): void;
        static unreap(atom: $mol_atom<any>): void;
        static schedule(): void;
        static sync(): void;
        then<Next>(done: (prev?: Value) => Next, fail?: (error: Error) => Next): $mol_atom<any>;
        catch(fail: (error: Error) => Value): $mol_atom<any>;
    }
    function $mol_atom_current<Value = any>(): $mol_atom<Value>;
    class $mol_atom_wait extends Error {
        name: string;
    }
    class $mol_atom_force extends Object {
        $mol_atom_force: boolean;
        static $mol_atom_force: boolean;
        static toString(): string;
    }
    class $mol_atom_force_cache extends $mol_atom_force {
    }
    class $mol_atom_force_update extends $mol_atom_force {
    }
}
declare namespace $ {
    function $mol_dict_key(value: any): any;
    class $mol_dict<Key, Value> extends Map<Key, Value> {
        get(key: Key): Value;
        has(key: Key): boolean;
        set(key: Key, value: Value): this;
        delete(key: Key): boolean;
        forEach(back: (value: Value, key: Key, dict: Map<Key, Value>) => void, context?: any): void;
        [Symbol.iterator](): {
            [Symbol.iterator](): any;
            next(): IteratorResult<[Key, Value], any>;
        };
    }
}
declare namespace $ {
    function $mol_mem<Host, Value>(obj: Host, name: string, descr: TypedPropertyDescriptor<(next?: Value, force?: $mol_atom_force) => Value>): void;
    function $mol_mem_key<Host, Key, Value>(obj: Host, name: string, descr: TypedPropertyDescriptor<(key: Key, next?: Value, force?: $mol_atom_force) => Value>): void;
}
declare namespace $ {
    function $mol_const<Value>(value: Value): {
        (): Value;
        '()': Value;
    };
}
declare namespace $ {
    function $mol_exec(dir: string, command: string, ...args: string[]): any;
}
interface $node {
    [key: string]: any;
}
declare var $node: $node;
/// <reference types="node" />
declare namespace $ {
    class $mol_file extends $mol_object {
        static absolute(path: string): $mol_file;
        static relative(path: string): $mol_file;
        path(): string;
        watcher(): any;
        stat(next?: any, force?: $mol_atom_force): any;
        version(): any;
        exists(next?: boolean): boolean;
        parent(): $mol_file;
        type(): "dir" | "link" | "file" | "blocks" | "chars" | "fifo" | "socket";
        name(): any;
        ext(): string;
        content(next?: string | Buffer, force?: $mol_atom_force): any;
        reader(): any;
        writer(): any;
        sub(): $mol_file[];
        resolve(path: string): $mol_file;
        relate(base?: $mol_file): any;
        append(next: string): void;
        find(include?: RegExp, exclude?: RegExp): $mol_file[];
    }
}
declare namespace $ {
    function $mol_typeof(value: any): any;
}
declare namespace $ {
    type $mol_tree_path = Array<string | number | null>;
    type $mol_tree_hack = (input: $mol_tree, context: $mol_tree_context) => $mol_tree[];
    type $mol_tree_context = Record<string, $mol_tree_hack>;
    type $mol_tree_library = Record<string, $mol_tree_context>;
    class $mol_tree {
        type: string;
        data: string;
        sub: $mol_tree[];
        baseUri: string;
        row: number;
        col: number;
        constructor(config?: {
            type?: string;
            value?: string;
            data?: string;
            sub?: $mol_tree[];
            baseUri?: string;
            row?: number;
            col?: number;
        });
        static values(str: string, baseUri?: string): $mol_tree[];
        clone(config: {
            type?: string;
            value?: string;
            data?: string;
            sub?: $mol_tree[];
            baseUri?: string;
            row?: number;
            col?: number;
        }): $mol_tree;
        static fromString(str: string, baseUri?: string): $mol_tree;
        static fromJSON(json: any, baseUri?: string): $mol_tree;
        readonly uri: string;
        toString(prefix?: string): string;
        toJSON(): any;
        readonly value: string;
        insert(value: $mol_tree, ...path: $mol_tree_path): $mol_tree;
        select(...path: $mol_tree_path): $mol_tree;
        filter(path: string[], value?: string): $mol_tree;
        transform(visit: (stack: $mol_tree[], sub: () => $mol_tree[]) => $mol_tree | null, stack?: $mol_tree[]): $mol_tree | null;
        hack(context: $mol_tree_context): $mol_tree;
        error(message: string): Error;
    }
}
declare namespace $ {
    class $mol_window extends $mol_object {
        static size(next?: {
            width: number;
            height: number;
        }): {
            width: number;
            height: number;
        };
    }
}
declare namespace $ {
}
declare namespace $ {
    var $mol_dom_context: Window & Pick<typeof globalThis, 'Node' | 'Element' | 'HTMLElement' | 'XMLHttpRequest' | 'DOMParser' | 'XMLSerializer'>;
}
declare namespace $ {
    class $mol_view_selection extends $mol_object {
        static focused(next?: Element[], force?: $mol_atom_force): Element[];
        static position(next?: {
            start: number;
            end: number;
            id: string;
        }, force?: $mol_atom_force): {
            start: number;
            end: number;
            id: string;
        };
        static onFocus(event: FocusEvent): void;
        static onBlur(event: FocusEvent): void;
    }
}
declare namespace $ {
    function $mol_dom_render_attributes(el: Element, attrs: {
        [key: string]: string | number | boolean;
    }): void;
}
declare namespace $ {
    function $mol_dom_render_events(el: Element, events: {
        [key: string]: (event: Event) => any;
    }): void;
    function $mol_dom_render_events_async(el: Element, events: {
        [key: string]: (event: Event) => any;
    }): void;
}
declare namespace $ {
    function $mol_dom_render_children(el: Element, childNodes: NodeList | readonly (Node | string | number | boolean | {
        dom_tree: () => Node;
    })[]): void;
}
declare namespace $ {
    function $mol_dom_render_styles(el: Element, styles: {
        [key: string]: string | number;
    }): void;
}
declare namespace $ {
    function $mol_dom_render_fields(el: Element, fields: {
        [key: string]: any;
    }): void;
}
declare namespace $ {
    function $mol_func_name(func: Function): string;
    function $mol_func_name_from<Target extends Function>(target: Target, source: Function): Target;
}
declare namespace $ {
    namespace $$ { }
    namespace $mol { }
    function $mol_view_visible_width(): number;
    function $mol_view_visible_height(): number;
    function $mol_view_state_key(suffix: string): string;
    class $mol_view extends $mol_object {
        static Root(id: number): $mol_view;
        static autobind(): void;
        title(): string;
        focused(next?: boolean): boolean;
        context(next?: $mol_ambient_context): $mol_ambient_context;
        $: $mol_ambient_context;
        context_sub(): $mol_ambient_context;
        state_key(suffix?: string): string;
        dom_name(): string;
        dom_name_space(): string;
        sub(): readonly (string | number | boolean | Node | $mol_view)[];
        sub_visible(): readonly (string | number | boolean | Node | $mol_view)[];
        minimal_width(): number;
        minimal_height(): number;
        content_height(): number;
        dom_id(): any;
        dom_node(next?: Element): Element;
        dom_tree(next?: Element): Element;
        render(): void;
        static view_classes(): (typeof $mol_view)[];
        view_names_owned(): string[];
        view_names(): string[];
        attr_static(): {
            [key: string]: string | number | boolean;
        };
        attr(): {
            [key: string]: string | number | boolean;
        };
        style(): {
            [key: string]: string | number;
        };
        field(): {
            [key: string]: any;
        };
        event(): {
            [key: string]: (event: Event) => void;
        };
        event_async(): {
            [key: string]: (event: Event) => void;
        };
        plugins(): readonly $mol_view[];
    }
}
declare namespace $ {
    class $mol_state_local<Value> extends $mol_object {
        static 'native()': Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
        static native(): Storage | {
            getItem(key: string): any;
            setItem(key: string, value: string): void;
            removeItem(key: string): void;
        };
        static value<Value>(key: string, next?: Value, force?: $mol_atom_force): Value;
        prefix(): string;
        value(key: string, next?: Value): Value;
    }
}
declare namespace $ {
    interface $mol_locale_dict {
        [key: string]: string;
    }
    class $mol_locale extends $mol_object {
        static lang_default(): string;
        static lang(next?: string): string;
        static source(lang: string): any;
        static texts(lang: string, next?: $mol_locale_dict): $mol_locale_dict;
        static text(key: string): string;
    }
}
declare namespace $ {
    function $mol_view_tree_trim_remarks(def: $mol_tree): $mol_tree;
    function $mol_view_tree_classes(defs: $mol_tree): $mol_tree;
    function $mol_view_tree_class_name(val: $mol_tree): string;
    function $mol_view_tree_super_name(val: $mol_tree): string;
    function $mol_view_tree_class_props(def: $mol_tree): $mol_tree;
    function $mol_view_tree_prop_name(prop: $mol_tree): string;
    function $mol_view_tree_prop_key(prop: $mol_tree): string;
    function $mol_view_tree_prop_next(prop: $mol_tree): string;
    function $mol_view_tree_prop_value(prop: $mol_tree): $mol_tree;
    function $mol_view_tree_value_type(val: $mol_tree): "string" | "object" | "null" | "number" | "locale" | "bool" | "dict" | "get" | "bind" | "put" | "list";
    function $mol_view_tree_compile(tree: $mol_tree): {
        script: string;
        locales: {
            [key: string]: string;
        };
    };
}
declare namespace $ {
    class $mol_graph<Node, Edge> {
        nodes: {
            [id: string]: Node | undefined;
        };
        edgesOut: {
            [from: string]: {
                [to: string]: Edge;
            };
        };
        edgesIn: {
            [to: string]: {
                [from: string]: Edge;
            };
        };
        nodeEnsure(id: string): void;
        linkOut(from: string, to: string, edge: Edge): void;
        linkIn(to: string, from: string, edge: Edge): void;
        edgeOut(from: string, to: string): Edge;
        edgeIn(to: string, from: string): Edge;
        link(from: string, to: string, edge: Edge): void;
        unlink(from: string, to: string): void;
        cut_cycles(get_weight: (edge: Edge) => number): void;
        readonly sorted: string[];
    }
}
declare namespace $ {
    const sourcemap_codec: any;
    type SourceMapLine = ReturnType<typeof sourcemap_codec.decode>[0];
    export interface $mol_sourcemap_raw {
        version: number;
        sources: string[];
        names: string[];
        sourceRoot?: string;
        sourcesContent?: (string | null)[];
        mappings: string;
        file: string;
    }
    export class $mol_sourcemap_builder {
        readonly file: string;
        readonly separator: string;
        version: number;
        protected sourceRoot: string;
        protected separator_count: number;
        constructor(file: string, separator?: string);
        protected chunks: string[];
        protected segment_lines: SourceMapLine[];
        protected sources: string[];
        protected source_indexes: Map<string, number>;
        protected names: string[];
        protected name_indexes: Map<string, number>;
        protected sourceContent: (null | string)[];
        readonly content: string;
        readonly sourcemap: $mol_sourcemap_raw;
        toJSON(): $mol_sourcemap_raw;
        toString(): string;
        protected add_chunk(content: string): void;
        protected add_content(content: string, file?: string): void;
        add(content: string, file?: string, raw?: $mol_sourcemap_raw | string): void;
    }
    export {};
}
declare namespace $ {
    function $mol_build_start(paths: string[]): void;
    class $mol_build extends $mol_object {
        static root(path: string): $mol_build;
        static relative(path: string): $mol_build;
        server(): $mol_build_server;
        root(): $mol_file;
        mods({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        modsRecursive({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sources({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesSorted({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesAll({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        tsOptions(): any;
        tsSource({ path, target }: {
            path: string;
            target: number;
        }): any;
        tsPaths({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): string[];
        tsCompile({ path, exclude, bundle }: {
            path: string;
            bundle: string;
            exclude: string[];
        }): $mol_object;
        sourcesJS({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesDTS({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        sourcesCSS({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        static dependors: {
            [index: string]: (source: $mol_file) => {
                [index: string]: number;
            };
        };
        srcDeps(path: string): {
            [index: string]: number;
        };
        modDeps({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): {
            [index: string]: number;
        };
        dependencies({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): {
            [index: string]: number;
        };
        modEnsure(path: string): boolean;
        modMeta(path: string): $mol_tree;
        graph({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_graph<null, {
            priority: number;
        }>;
        bundleAll({ path }: {
            path: string;
        }): void;
        bundle({ path, bundle }: {
            path: string;
            bundle?: string;
        }): Object[];
        logBundle(target: $mol_file): void;
        bundleJS({ path, exclude, bundle, moduleTarget }: {
            path: string;
            exclude: string[];
            bundle: string;
            moduleTarget?: string;
        }): $mol_file[];
        bundleTestJS({ path, exclude, bundle }: {
            path: string;
            exclude: string[];
            bundle: string;
        }): $mol_file[];
        bundleTestHtml({ path }: {
            path: string;
        }): $mol_file[];
        bundleDTS({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleViewTree({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        nodeDeps({ path, exclude }: {
            path: string;
            exclude: string[];
        }): string[];
        bundlePackageJSON({ path, exclude }: {
            path: string;
            exclude: string[];
        }): $mol_file[];
        bundleFiles({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        bundleCordova({ path, exclude }: {
            path: string;
            exclude?: string[];
        }): $mol_file[];
        bundleCSS({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleLocale({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
        bundleDepsJSON({ path, exclude, bundle }: {
            path: string;
            exclude?: string[];
            bundle: string;
        }): $mol_file[];
    }
}
declare namespace $ {
    class $mol_server extends $mol_object {
        express(): any;
        messageStart(port: number): string;
        expressHandlers(): any[];
        expressCompressor(): any;
        expressBodier(): any;
        expressFiler(): any;
        expressDirector(): any;
        expressGenerator(): (req: any, res: any, next: () => void) => void;
        bodyLimit(): string;
        cacheTime(): number;
        port(): number;
        rootPublic(): string;
    }
}
declare namespace $ {
    class $mol_build_server extends $mol_server {
        expressGenerator(): (req: any, res: any, next: () => void) => void;
        build(): $mol_build;
        generator(path: string): $mol_file[] | Object[];
        port(): number;
    }
}
