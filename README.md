# Mapacen.pl
3rd year 5th semester Computer Science - Software Engineering project.
Regional price comparison web application.

## Technologies
* .NET 6.0 WebAPI
* Entity Framework Core 6.0
* MS SQL Server
* Angular 14

## Overview
Once you enter the site, you can create a new account or log in to existing one.
Validation of the input data is implemented in both frontend and backend. For example, email and password must match a regex. Moreover, account will not be created if the input email already exists in the database.

![registration](https://user-images.githubusercontent.com/30570850/221932960-4dd1ead7-effb-4858-beb1-d595582f8b52.png)

If the registration and logging in is successful, the following view will be shown:

![main_view](https://user-images.githubusercontent.com/30570850/221933090-140c4aa9-e2e3-4e4d-97b6-48b31d7e0746.png)

You can search for a product by name:

![search_by_name](https://user-images.githubusercontent.com/30570850/221933174-b6b91998-2d9b-4768-9c02-7aedd3b47035.png)

Searching for a product by category name only:

![zmianaKategorii](https://user-images.githubusercontent.com/30570850/221933251-2ea3ffc2-47ad-46e9-8b2f-046016eacc98.png)

Once you click an offer, full address of a sales point will show up. There is also a comment section where you can write your own comment or like/dislike someone else's comment. You can also add an offer to favourites by hitting the heart button. It is worth mentioning that there is no way to like/dislike a comment more than once. Backend creators considered this case.

![komentowanieILikowanie](https://user-images.githubusercontent.com/30570850/221933330-4b40b7e7-f6e9-4c25-9d01-9989ed76dbdc.png)

It is inefficient to fetch all the offers from the database at once, so in order to avoid this, the pagination of results is implemented.

![paging](https://user-images.githubusercontent.com/30570850/221932747-d32dcc57-3967-4b82-a539-c00e6b073c3e.png)

If an administrator is logged in, there are new features available. They can remove a comment or ban an user. Banned user cannot comment on an offer and their all comments are deleted.

![adminUsuwanieKomentarzaIBlokowanie](https://user-images.githubusercontent.com/30570850/221933450-7fb679d2-f4f9-4b73-b71d-cc6cfaa64a07.png)

There is also a seperate section for administrators only. This is the place where products, categories, sales points and offers are added/modified/deleted and where users can be unbanned.

![panelAdminaWybor](https://user-images.githubusercontent.com/30570850/221933502-62c90295-0ba5-4589-9e7a-078fc5a7a663.png)

Adding a new product: (any image can be uploaded, it will be resized in backend)

![panelAdminaDodawanieProduktu](https://user-images.githubusercontent.com/30570850/221933570-b4f85c32-9e97-4bc3-9380-298a06684be8.png)

## Database diagram

![schematBazy](https://user-images.githubusercontent.com/30570850/221933604-27f41aa2-b6a4-425b-8f23-b7d698b30ad1.png)

# Division of tasks:

## Backend:
- Mateusz - https://github.com/matebab551
- Janek - https://github.com/PanJan44

## Frontend:
- Filip - https://github.com/corosto
- Karol - https://github.com/my-memory-leaked
- Dominik - https://github.com/DominikBarys

## Design:
- Wiktor - https://github.com/wm1511
