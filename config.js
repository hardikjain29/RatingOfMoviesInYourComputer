function selectFolder(e) {
    var names = [];
    var theFiles = e.target.files;
    for (var i = 0; i < theFiles.length; i++) {
        var relativePath = theFiles[i].webkitRelativePath;
        var folder = relativePath.split("/");
        if (names.indexOf(folder[1]) == -1) {
            names.push(folder[1]);
        }
    }


    var title = [];

    for (var i = 0; i < names.length; i++) {
        //Check for Extension Pattern

        var ext = /\.(3g2|wmv|webm|mp4|avi|mp4a|mpeg|sub|mka|m4v|ts|mkv|ra|rm|wma|ass|mpg|ram|3gp|ogv|mov|ogm|asf|divx|ogg|ssa|qt|idx|nfo|wav|flv|3gp2|iso|mk2|srt)$/ig;
        var extBool = ext.test(names[i]);

        if (extBool) {
            names[i] = names[i].replace(ext, " ");
        }

        //Check for Screen Size


        var screen = /720p|1080p|1080i|\d{3,4}x\d{3,4}|4K|360p|368p|480p|576p|900p/ig;
        var screenBool = screen.test(names[i]);

        if (screenBool) {
            names[i] = names[i].replace(screen, " ");
        }


        //Check for video format

        var format1 = /CAMRip|DVDSCR|DVDRip|DVDR|DVDSCREENER|HDTV|HDTVRip|HDCam|HDRip|WEBDL|WEB-DL|WEB-Rip|WEBRip|BDRip|BRRip|Blu-Ray|BluRay|BRRip|BR-RIP|BRR|TELESYNCSCR|SCREENER|BDR|BDSCR|DDC|R5.LINE|R5.AC3.5.1.HQDVD-Full|Full-Rip|ISOrip|DVD-5|DVD-9|DSR|DSRip|DTHRip|DVBRip|PDTV|TVRip|VODRip|VODR|WEB-Cap|WEBCAP|BD5|BD9|BD25|BD50|R5|PDVD|WORKPRINT|TELECINE|PPV|PPVRip|losslessrip|untouchedrip/ig;
        var format2 = /\b(CAM|TS|WP|TC)\b/ig;

        var formatBool1 = format1.test(names[i]);
        var formatBool2 = format2.test(names[i]);

        if (formatBool1) {
            names[i] = names[i].replace(format1, " ");
        }
        if (formatBool2) {
            names[i] = names[i].replace(format2, " ");
        }

        //video codec

        var vcodec = /x264|DivX|XviD|Real|Mpeg2|h264|h265/ig;
        var vcodecBool = vcodec.test(names[i]);

        if (vcodecBool) {
            names[i] = names[i].replace(vcodec, " ");
        }

        //audio codec

        var acodec = /\b(AAC\d*|AC3|MP3|MP4|DTS|TrueHD|DolbyDigital|Flac)\b/ig;
        var acodecBool = acodec.test(names[i]);

        if (acodecBool) {
            names[i] = names[i].replace(acodec, " ");
        }

        //video profile

        var vprofile = /\b(8bit|10bit|HP|BP|MP|XP|Hi422P|Hi444PP)\b/ig;
        var vprofileBool = vprofile.test(names[i]);

        if (vprofileBool) {
            names[i] = names[i].replace(vprofile, " ");
        }

        //audio profile

        var aprofile = /\b(LC|HQ|HD|HE|HDMA)\b/ig;
        var aprofileBool = aprofile.test(names[i]);

        if (aprofileBool) {
            names[i] = names[i].replace(aprofile, " ");
        }

        //audio channel

        var achannel = /\b(1\.0|2\.0|5\.1|7\.1)\b/ig;
        var achannelBool = achannel.test(names[i]);

        if (achannelBool) {
            names[i] = names[i].replace(achannel, " ");
        }

        //other

        var other = /\b(Uncut|Director Cut|Director's Cut|Director-Cut|Director's-Cut|Fansub|HR|HQ|Netflix|Screener|Preair|Unrated|HD|mHD|HDLight|3D|SyncFix|Bonus|WideScreen|Fastsub|R5|AudioFix|DDC|Trailer|Complete|Extended|Limited|Classic|Proper|DualAudio|LiNE|Remux|PAL|SECAM|NTSC|Duology|Duo|Trilogy|Trio|Repack)\b/ig;
        var otherBool = other.test(names[i]);

        if (otherBool) {
            names[i] = names[i].replace(other, " ");
        }

        //remove website

        var web = /\b(?:http:\/\/)?(?:www\.)?([^\s\[\]\(\)\{\}_.-]*\.(?:com|org|net|info|biz|ws|us|co\.uk|uk|to|tr|ru|rs|ro|in|co\.in|io|eu|cz|co|ch|cd|cc|ca|bz|ac))\b/ig;
        var webBool = web.test(names[i]);

        if (webBool) {
            names[i] = names[i].replace(web, " ");
        }


        var firstDate = /.{2,}(19|20)[0-9][0-9]/i;
        var secondDate = /(.+?)(19|20)[0-9][0-9](.*)/i;
        var splCharsWithoutSome = /[&_\/\\#+()$~%.:*?<>{}\[\]]/g;
        var splChars = /[&_\-\/\\#,+()$~%.:*?<>{}\[\]]/g;

        if (firstDate.test(names[i])) {
            var dateMatcher = names[i].match(secondDate);
            var dateMatch = dateMatcher[1];
            var stitle = dateMatch.replace(splCharsWithoutSome, " ").replace(/\s+/g, ' ').trim();

        } else {
            var stitle = names[i].replace(splChars, " ").replace(/\s+/g, ' ').trim();
        }

        if (stitle) {
            title.push(stitle);
        }
    }
    getRatings(title);
    // console.log(actualData);
}


function getRatings(titles) {
    var returnedArray = [];
    for (var i = 0; i < titles.length; i++) {
        var tits = titles[i];
        var b = {
            "poster": "NA",
            "title": "NA",
            "year": "NA",
            "id": "NA",
            "runtime": "NA",
            "genre": "NA",
            "plot": "NA",
            "rating": 0.0,
        };
        $.ajax({
            url: "http://www.omdbapi.com/?t=" + tits,
            cache: false,
            beforeSend: function() {
                $('.not').html('<img class="gi" src="gears.gif"/>');
            },
            dataType: "json"
        }).done(function(data) {

            returnedArray.push(data);

            // //console.log(data);
            // b.poster = data.Poster;
            // b.title =  data.Title;
            // b.year = data.Year;
            // b.id = data.imdbID;
            // b.runtime = data.Runtime;
            // b.genre = data.Genre;
            // b.plot = data.Plot;
            // b.rating = data.imdbRating;
            // console.log(b);
        });
    }
    //console.log(returnedArray);

    $(document).ajaxStop(function() {
        //console.log(returnedArray);
        var sortedArray = returnedArray.sort(compare);

        function compare(a, b) {
            if (a.imdbRating > b.imdbRating)
                return 1;
            if (a.imdbRating < b.imdbRating)
                return -1;
            return 0;
        }

        var notFound = 0;
        sortedArray.reverse();
        var html = " ";
        var k = 1;
        for (var i = 0; i < sortedArray.length; i++) {
            html = html + '<tr>';
            if (sortedArray[i].Response == "True") {
                html = html + '<td>' + (k) + '</td>';
                k++;
                html = html + '<td><img src="' + sortedArray[i].Poster + '" alt="Image not Available" /></td>';
                html = html + '<td><a href="http://www.imdb.com/title/' + sortedArray[i].imdbID + '">' + sortedArray[i].Title + '</a></td>';
                html = html + '<td>' + sortedArray[i].Year + '</td>';
                html = html + '<td>' + sortedArray[i].Runtime + '</td>';
                html = html + '<td>' + sortedArray[i].Genre + '</td>';
                html = html + '<td>' + sortedArray[i].Plot + '</td>';
                html = html + '<td>' + sortedArray[i].imdbRating + '</td>';
                html = html + '</tr>';
                $('tbody').html(html);
            } else {
                notFound++;
            }
        }
        var g = '<p>Sorry could not find ' + notFound + ' Movies.I am working on making it efficient.</p>'
        $(".not").html(g);
    });


}
