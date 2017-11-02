# **MyArt.com**
### or ArtistLife, or FeedArtists, or NoMorePoorArtists, or HelpingArtists
## Internet Applications Design and Implementation (2017/18)
## Project Assignment
The project assignment will evolve during the semestre to incorporate more information and
details.
Versions:
- **15 Oct 2017**: Initial version, first phase
### Introduction
The goal of this project is to build a web platform to enable artists (i.e, people that
produce a form of art that can be captured through a multimedia format such as
photographs, video, or audio) to publicite, sell, and keep a public portfolio of their art
and make a name for themselves.
To this end, the web application should enable an artist to register itself in the
platform and afterwards, add any number of art pieces to their virtual gallery. Each art
piece has a name, at least one (potentially more) multimedia contents showcasing it, and a
technical spec of the art piece, where the artist can state, the date that the piece was
created, techniques employed, and a textual description of the piece itself (provided by
the author) and a set of keywords that describe the piece. The author gallery is always
available, independent of login, and showcases the one visual multimedia representation of
the piece as well as the name of the piece and an indication if the piece is currently
available to be sold (optionally with a price).
Art pieces can be sold, with the assistance of the platform, if the author indicates that
the piece is available for selling. Each art piece has its own page, where all the
information regarding the piece is reported. Additionally, each keyword associated with
the piece should redirect the user observing that page to a page showcasing the most
recent art pieces (from any author) that contain that keyword. The page for each art piece
should also enable the easy navigation to the public gallery of the artist. Finally, if
the art piece is currently available to be sold, the art piece page should enable a user
that is currently logged-in to make a bid for the piece. The bid should be the price
indicated by the author if it exists, or a value imputed by the user that wants to buy the
piece.
Finally, when a user wants to buy the piece, the author of the piece should get a
notification in its in-box about that intent. The author can accept or reject the offer.
Both will lead to a notification being sent to that user (i.e., the buyer). In the
particular case in which the the author accepts the offer, the buyer can indicate if she
is willing to make this public. If she answers yes, and after the author confirms to the
system that the transaction was performed, another piece of information will be added to
the page of the art piece, stating who is the user currently owning that piece of art.
## Submission Phases
The project is to be delivered in two different phases, in two different dates.
### Important dates
* First phase: 5 Nov
* Final phase: 9 Dec
There are 2 (free) late days and 2 penalty late days to be used in either of the phases.
This means that you may use the free late days on either phase without any penalty, and
two extra days with a penalty of 2 values per day in the final grade (not on the partial
phase grades).
### Grading
file:///Users/jleitao/Documents/My%20Courses/CIAI%202017/ciai-1718-private/project/assignment%20proposal.md 1/2
17/10/2017 assignment proposal.md
The project will be graded taking in consideration all different aspects of the work. This
section will be completed soon. The evaluation will be approximately 40%/60%.
### First phase
The first phase of the project consists of the user-centred development of a client
application for the scenario above.
The deliverables are the following:
- User stories to cover the scenario
- Report with IFML specification
- React application code (including CSS)
### Second phase
The second phase will consist of the data-centred development of the application. The
architecture of such an application includes a REST interface, a MVC structure, a Database
structure. The first phase can be updated and integrated at this stage. More details to be
released in the future.
### Team requirements
The teams will consist of 2 or 3 elements.
### Submission details
You should provide your work in a git repository in a `bitbucket.org` using the campus
email (full features), and including `costaseco` and `jleitao` as team members (read
rights). To be considered the first phase must be tagged `V0.5` and second phase must be
tagged `V1.0`.
