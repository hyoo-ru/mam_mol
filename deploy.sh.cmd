git checkout gh-pages
git merge master
npm start mol mol/app/hello mol/app/supplies mol/app/habhub mol/app/todomvc mol/perf/render mol/perf/uibench
git commit -a -m "Update" && git push || git checkout master
echo Done!
