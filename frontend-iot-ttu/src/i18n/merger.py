# Since the previous approach to directly code in the JSONs was not practical due to their size,
# let's take a different approach by defining a function to merge them.
import json
def merge_translations(en, et):
    def merge_dicts(d1, d2, path=None):
        if path is None: path = []
        for key in d1:
            if key in d2:
                if isinstance(d1[key], dict) and isinstance(d2[key], dict):
                    merge_dicts(d1[key], d2[key], path + [str(key)])
                else:
                    # Assume both languages have the same structure, no need to check types in d2
                    d1[key] = {'en': d1[key], 'et': d2[key]}
            else:
                raise Exception('Mismatch found at {}'.format('.'.join(path + [str(key)])))
        return d1

    return merge_dicts(en, et)


en_json = {
            "admin": {
              "admin": "Admin",
              "header": {
                "news": "News",
                "openSourceSolutions": "Open source solutions",
                "projects": "Projects",
                "public": "Public website",
                "statistics": "Statistics",
                "technology": "Technology",
                "users": "Users",
                "banners": "Banners",
                "admin": "Admin"
              },
              "imageUploader": {
                "chooseFile": "Choose file",
                "clickToUploadFile": "Click to upload file"
              },
              "news": {
                "adminNews": {
                  "create": {
                    "addTopicArea": "Add topic area",
                    "author": "Author",
                    "authorName": "Author name",
                    "categories": "Categories",
                    "chooseTopicArea": "Choose topic area",
                    "contentEng": "Main content in English",
                    "contentEst": "Main content in Estonian",
                    "create": "Create",
                    "createNewPost": "Create new post",
                    "createTopicArea": "Create topic area",
                    "fileIsTooBig": "File is too large. Maximum size is {{size}} MB.",
                    "thumbnail": "Thumbnail",
                    "titleInEnglish": "Title in English",
                    "titleInEstonian": "Title in Estonian",
                    "titles": "Titles",
                    "uploadPoster": "Upload a poster",
                    "NAME_ALREADY_EXISTS": "Topic area with this name already exists",
                    "validation": {
                      "fieldIsRequired": "This field is mandatory",
                      "AuthorNameLen": "Author name should be at least 1 letter",
                      "topicAreaMandatory": "Choose at least 1 topic area",
                      "imageRequired": "Add some image for this post"
                    }
                  }
                }
              },
              "projects": {
                "validation": {
                  "year": "Must be a positive number",
                  "projectVolume": "Must be a positive number"
                }
              },
              "topicAreas": {
                "createTopicArea": "Create new topic area",
                "NAME_ALREADY_EXISTS": "Topic area with this name already exists"
              }
            },
            "author": "author",
            "public": {
              "header": {
                "adminPanel": "Admin panel",
                "contactUs": "Contact us",
                "home": "Home",
                "news": "News",
                "openSourceSolutions": "Open source solutions",
                "projects": "Projects",
                "technology": "Technology"
              },
              "news": {
                "news": "News",
                "filters": "Filters",
                "news-list": "News list",
                "contact": "Interested? Contact us!"
              },
              "contact": {
                "validEmail": "Please provide a valid email",
                "contact": "Contact us",
                "yourInfo": "Your information",
                "yourMessage": "Your message",
                "form": {
                  "email": "Your email",
                  "firstName": "First name",
                  "lastName": "Last name",
                  "phone": "Phone number",
                  "submit": "Submit"
                }
              }
            },
            "errorPage": {
              "somethingWentWrong": "Looks like we're experiencing technical problems. Try again later...",
              "notFound": "Page not found"
            },
            "common": {
              "date": "Date",
              "author": "Author",
              "topicAreas": "Topic areas",
              "year": "Year",
              "projectManager": "Project manager",
              "volume": "Volume",
              "title": "Title",
              "requiredField": "Required field",
              "submit": "Submit",
              "passwordsMustMatch": "Passwords must match",
              "changePassword": "Change password",
              "new": "New",
              "delete": "Delete",
              "remove": "Remove",
              "update": "Update",
              "confirm": "Confirm",
              "toggleEdit": "Toggle edit",
              "togglePreview": "Toggle preview",
              "loggedInAs": "Logged in as:",
              "withRole": "With role:",
              "adminPanel": "Admin panel",
              "actions": "Actions",
              "createdAt": "Created at",
              "createdBy": "Created by",
              "name": "Name",
              "views": "Views",
              "child": "Child",
              "deleteUSure": "Are you sure you want to delete this?",
              "toolong": "Maximum field length is {{len}}",
              "serviceUnavailable": "Service unavailable",
              "yes": "Yes",
              "no": "No",
              "forPage": "For page:",
              "titles": "Titles",
              "added": "Added",
              "error": "Error occurred",
              "view": "View",
              "save": "Save"
            },
            "banners": {
              "adminTitle": "Manage banners",
              "createTitle": "Create/update banner",
              "titleEng": "Title in english",
              "titleEst": "Title in estonian",
              "subtitleEng": "Subtitle in english",
              "subtitleEst": "Subtitle in estonian",
              "instructions": "Banners are displayed in order in which they will be displayed to the user. To reorder them simply drag and drop."
            },
            "user": {
              "listTitle": "User management",
              "changeRole": "Change role",
              "username": "Username",
              "email": "Email",
              "firstname": "First name",
              "lastname": "Last name",
              "role": "Role",
              "noRights": "No permissions",
              "users": "Users",
              "changeRoleFor": "Change role for user {{user}}",
              "roleChanged": "Role changed successfully",
              "permissionAlert": "Your role does not permit other users role changes",
              "logout": "Logout"
            },
            "pageContent": {
              "titleEng": "Title in english",
              "titleEst": "Title in estonian"
            },
            "partners": {
              "partners": "Our partners"
            },
            "contact": {
              "listTitle": "Contact person management",
              "createPerson": "Add contact person",
              "personName": "Person name",
              "contactInfo": "Contact information",
              "contactInfoEng": "Contact information in english",
              "contactInfoEst": "Contact information in estonian",
              "success": "Your message has been sent!",
              "fail": "Something went wrong. Try again later!"
            },
            "news": {
              "news": "News",
              "title": "Title",
              "author": "Author",
              "numberOfPosts": "Number of posts"
            },
            "projects": {
              "projects": "Projects",
              "titleEng": "Title in english",
              "titleEst": "Title in estonian",
              "year": "Year",
              "projectManager": "Project manager",
              "projectVolume": "Project volume(in euro)"
            },
            "oss": {
              "emailToGet": "Enter your email to get access"
            }
          }

et_json = {
            "admin": {
              "admin": "Administraator",
              "header": {
                "news": "Uudised",
                "openSourceSolutions": "Vabavaralised lahendused",
                "projects": "Projektid",
                "public": "Avalik leht",
                "statistics": "Statistika",
                "technology": "Tehnoloogia",
                "users": "Kasutajad",
                "banners": "Bannerid",
                "admin": "Admin"
              },
              "imageUploader": {
                "chooseFile": "Vali file",
                "clickToUploadFile": "Vajuta faili lisamiseks"
              },
              "news": {
                "adminNews": {
                  "create": {
                    "addTopicArea": "Lisa kategoria",
                    "author": "Autor",
                    "authorName": "Autori nimi",
                    "categories": "Kategooriad",
                    "chooseTopicArea": "Vali kategooria",
                    "contentEng": "Postituse sisu inglise keeles",
                    "contentEst": "Postituse sisu eesti keeles",
                    "create": "Salvesta",
                    "createNewPost": "Uus postitus",
                    "createTopicArea": "Loo kategoria",
                    "fileIsTooBig": "Faili suurus on liiga suur. Maksimum suurus on {{size}} MB.",
                    "thumbnail": "Postituse pilt",
                    "titleInEnglish": "Pealkiri inglise keeles",
                    "titleInEstonian": "Pealkiri eesti keeles",
                    "titles": "Pealkirjad",
                    "uploadPoster": "Pilt",
                    "NAME_ALREADY_EXISTS": "Kategooria selle nimega on juba olemas",
                    "validation": {
                      "fieldIsRequired": "See väli on kohustuslik",
                      "AuthorNameLen": "Autori nimi peab olema vähemalt 1 täht",
                      "topicAreaMandatory": "Vali vähemalt 1 kategooria",
                      "imageRequired": "Lisa pilt"
                    }
                  }
                }
              },
              "projects": {
                "validation": {
                  "year": "Peab olema positivne number",
                  "projectVolume": "Peab olema positivne number"
                }
              },
              "topicAreas": {
                "createTopicArea": "Loo uus kategooria",
                "NAME_ALREADY_EXISTS": "Kategooria selle nimega on juba olemas"
              }
            },
            "author": "autor",
            "public": {
              "header": {
                "adminPanel": "Admiini panel",
                "contactUs": "Võta ühendust",
                "home": "Koduleht",
                "news": "Uudised",
                "openSourceSolutions": "Vabavaralised lahendused",
                "projects": "Projektid",
                "technology": "Tehnoloogia"
              },
              "news": {
                "news": "Uudised",
                "filters": "Filtrid",
                "news-list": "Teised uudised",
                "contact": "Huvitatud? Võta ühendust!"
              },
              "contact": {
                "validEmail": "Sisestage õige email",
                "contact": "Võta ühendust",
                "yourInfo": "Teie info",
                "yourMessage": "Teie sõnum",
                "form": {
                  "email": "Teie email",
                  "firstName": "Eesnimi",
                  "lastName": "Perekonnanimi",
                  "phone": "Telefoninumber",
                  "submit": "Saada"
                }
              }
            },
            "errorPage": {
              "somethingWentWrong": "Näib, et meil on tehnilisi probleeme. Proovige hiljem uuesti...",
              "notFound": "Lehekülg ei ole leitud"
            },
            "common": {
              "date": "Kuupäev",
              "author": "Autor",
              "topicAreas": "Kategooriad",
              "year": "Aasta",
              "projectManager": "Projektijuht",
              "volume": "Maht",
              "title": "Pealkiri",
              "requiredField": "See väli on kohustuslik",
              "submit": "Saata",
              "passwordsMustMatch": "Salasõnad peavad olema samasugused",
              "changePassword": "Muuda salasõna",
              "new": "Uus",
              "delete": "Kustuta",
              "remove": "Eemalda",
              "update": "Uuenda",
              "confirm": "Kinnita",
              "toggleEdit": "Muutmise reziim",
              "togglePreview": "Eelvaade reziim",
              "loggedInAs": "Sisse logitud:",
              "withRole": "Rolliga:",
              "adminPanel": "Administraatori paneel",
              "actions": "Tegevused",
              "createdAt": "Loodud kuupäeval",
              "createdBy": "Loodud",
              "views": "Vaated",
              "name": "Nimi",
              "child": "Laps",
              "deleteUSure": "Oled kindel, et tahad seda kustutada?",
              "toolong": "Pikkus peab olema vähem kui {{len}}",
              "serviceUnavailable": "Teenus pole saadaval",
              "yes": "Jah",
              "no": "Ei",
              "forPage": "Leheküljele:",
              "titles": "Pealkirjad",
              "added": "Lisatud",
              "error": "Viga juhtus",
              "view": "Vaata",
              "save": "Salvesta"
            },
            "banners": {
              "adminTitle": "Halda bannerid",
              "createTitle": "Loo/muuda banner",
              "titleEng": "Pealkiri inglise keeles",
              "titleEst": "Pealkiri eesti keeles",
              "subtitleEng": "Alpealkiri inglise keeles",
              "subtitleEst": "Alpealkiri eesti keeles",
              "instructions": "Bännerid kuvatakse kasutajale kuvamise järjekorras. Nende ümberjärjestamiseks lihtsalt lohistage."
            },
            "user": {
              "listTitle": "Kasutajate haldamine",
              "changeRole": "Muuda rolli",
              "username": "Kasutaja nimi",
              "email": "Email",
              "firstname": "Eesnimi",
              "lastname": "Perekonnanimi",
              "role": "Roll",
              "noRights": "Ei ole õigusi",
              "users": "Kasutajad",
              "changeRoleFor": "Muuda rolli kasutajale {{user}}",
              "roleChanged": "Roll oli muudetud",
              "permissionAlert": "Teie õigused ei lase teil rolli muuta",
              "logout": "Logi välja"
            },
            "pageContent": {
              "titleEng": "Pealkiri inglise keeles",
              "titleEst": "Pealkiri eesti keeles"
            },
            "partners": {
              "partners": "Meie partnerid"
            },
            "contact": {
              "listTitle": "Kontakt isikute haldamine",
              "createPerson": "Kontakt isiku lisamine",
              "personName": "Nimi",
              "contactInfo": "Kontakt andmed",
              "contactInfoEng": "Kontakt andmed inglise keeles",
              "contactInfoEst": "Kontakt andmed eesti keeles",
              "success": "Teie sõnum oli saadetud!",
              "fail": "Midagi läks valesti, prooviga hiljem uuesti!"
            },
            "news": {
              "news": "Uudised",
              "title": "Pealkiri",
              "author": "Autor",
              "numberOfPosts": "Postituse arv"
            },
            "projects": {
              "projects": "Projektid",
              "titleEng": "Pealkiri inglise keeles",
              "titleEst": "Pealkiri eesti keeles",
              "year": "Aasta",
              "projectManager": "Projekti juht",
              "projectVolume": "Projekti maht(euros)"
            },
            "oss": {
              "emailToGet": "Sisestage oma emaili et ligi saada"
            }
          }


# Perform the merge
merged_translations = merge_translations(en_json, et_json)
print(json.dumps(merged_translations, ensure_ascii=False))

# Due to the large size of the JSON objects, let's print only a small part of the merged result to check the structure.
# You can then apply this function to your entire JSON structures.
# {key: merged_translations[key] for key in list(merged_translations)[:2]}  # Print a small portion for verification
