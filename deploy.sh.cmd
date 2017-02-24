git checkout gh-pages
git merge master
npm start mol mol/app/hello mol/app/supplies mol/app/habhub mol/app/todomvc mol/perf/render mol/perf/uibench mol/app/bench mol/app/bench/list/mol mol/app/bench/list/tsx mol/app/taxon mol/app/taxon/demo mol/app/users mol/mem mol/app/quine mol/app/lamps mol/app/files
git commit -a -m "Update" && git push || git checkout master
