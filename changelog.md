# CMS

## Version 1.25.8
+ Simple change

## Version 1.25.5
+ ### Client
+ Fixed/changes some parts and components.
+ ### Backend
+ Added Post Categories Model to group post by categories.

## Version 1.25.0
+ ### Client
+ Updated tool editor, now it is possible to choose two types of bold font, sematic bold and normal bold, but still having a problem, I will try to fix it maybe in the next changes.
+ Modified tool editor, separated some buttons into components.

## Version 1.2.1
+ ### Client
+ FormPost/Category, Bug fixed, when you create new post, in logic of category componet if not choice any categorie was executed timeout infinite, now is corrected.

## Version 1.2.0
+ ### Client
+ FormPost updated, now you can add categories to new post.
+ Notificatios Component, added new component to notificate to user.
+ ### Backend
+ Added Zod dependencie to validate Requests.

## Version 1.1.25
+ Changed the Tool Editor, before when toggling to __italic__ or __strong__ text, added a css class to achieve this, change to add the correct __HTML__ tag.
+ Currenly exist a bug, when select an word of paragraph and togglin font style, wrap all paragraph in __HTML__ tag.

## Version 1.1.2
+ Tools Editor (List Button) Bug Fix, when you try to change the list to another, the selected text is added to the new selected list.
+ Split List Button to separated Buttons.
+ Change/Rename Form to components __FormPost__ folder.

## Version 1.1.1
+ Updated Tools Editor, migrate __Div ContentEditable__ element to ToolsTextEditor Component.
+ Now Tools Editor have a __Select Button__, to order text selected in any list (currently have two types list).

## Version 1.1.0
+ Updated Tools Editor, now you can select multiple lines of text and choose any of the headers

## Version 1.0.1
+ Added Rome Linter/Formatter.
+ Update Upload Component to use one State to manage diferents files.
+ Changed Files Componets to adapt Upload Component.

## Version 1.0.0
+ Added New module to manage Categories Frontend/Backend.
+ Changed Uploas Files module.