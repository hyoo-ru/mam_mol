git checkout gh-pages
git merge master
npm start mol mol/app/supplies mol/perf/render mol/perf/uibench
git commit -a -m "Update"
git push
git checkout master
