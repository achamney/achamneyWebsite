cp -r * ~/Downloads/svn/achamney-cloud/ROOT/
svn add --force ~/Downloads/svn/achamney-cloud/ROOT/* --auto-props --parents --depth infinity -q
svn commit ~/Downloads/svn/achamney-cloud/ROOT/
