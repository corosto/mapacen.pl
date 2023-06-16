import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { OffersService } from '@modules/offers/api/offers.service';
import { OfferContent } from '@modules/top-menu/interfaces/top-menu.interface';
import { MyComment, Offers } from '@modules/offers/interfaces/offers.interface';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  @Input() set filterOffers(value: OfferContent) {
    this.isFavourites = false;
    this.page = 1;
    if (value) {
      this.search = value.search;
      this.categoryId = Number(value.category);
      this.refreshOffers();
    }
  }

  @Input() set getFavourites(value: number) {
    if (localStorage.getItem('userToken')) {
      this.getFav();
    }
  }

  getFav(): void {
    this.isFavourites = true;
    this.page = 1;
    this.offersService.getFavourites(this.page, this.pageSize).subscribe((res) => {
      this.offers = res.offers.map((result) => {
        return {
          ...result,
          isFavourite: true,
        }
      })
      this.totalSites = Math.ceil(res.count / this.pageSize);
    });
  }

  countyId: number;
  search: string;
  categoryId: number;
  page = 1;
  offers: Offers[] = [];
  totalSites: number;
  isAdmin: boolean;
  isNotLogged: boolean;
  canComment: boolean;
  isFavourites = false;
  pageSize = 5;
  panelOpenState = false;
  form: FormGroup;

  constructor(
    private offersService: OffersService,
    private myLocalStorageService: MyLocalStorageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      comment: [null],
    });

    this.isAdmin = this.myLocalStorageService.isServiceAdmin();
    this.isNotLogged = !this.myLocalStorageService.isLogged();
    this.canComment = localStorage.getItem('userCommenting') === 'true' ? true : false;
    this.isFavourites = false;
    this.refreshOffers();
  }

  getComments(offer: Offers): void {
    this.offersService.getComments(offer.id, Number(localStorage.getItem('userId'))).subscribe((res) => {
      offer.comments = res
    });
  }

  comment(offer: Offers): void {
    const value = this.form.get('comment').value;
    const userId = Number(localStorage.getItem('userId'));
    if (value) {
      this.offersService.addComment(value, userId, offer.id).subscribe(() => this.getComments(offer));
      this.form.reset();
    }
  }

  banUser(offer: Offers, id: number) {
    if (id !== Number(localStorage.getItem('userId'))) {
      this.offersService.banUser(id).subscribe(() => this.getComments(offer));
    }
  }

  removeComment(offer: Offers, comment: MyComment) {
    this.offersService.deleteComment(comment.id).subscribe(() => this.getComments(offer));
  }

  toggleFavourite(offer: Offers): void {
    this.offersService.updateFavourites(offer.id, Number(localStorage.getItem('userId'))).subscribe(() => {
      offer.isFavourite = !offer.isFavourite;

      if (this.isFavourites) {
        this.getFav();
      }
    });
  }

  like(comment: MyComment): void {
    this.offersService.like(comment.id, Number(localStorage.getItem('userId'))).subscribe(() => {
      if (comment.isLikedOrDislikedByUser === true) {
        comment.likes = comment.likes - 1;
        comment.isLikedOrDislikedByUser = null;
      }
      else if (comment.isLikedOrDislikedByUser === false) {
        comment.likes = comment.likes + 1;
        comment.disLikes = comment.disLikes - 1;
        comment.isLikedOrDislikedByUser = true;
      }
      else if (comment.isLikedOrDislikedByUser === null) {
        comment.likes = comment.likes + 1;
        comment.isLikedOrDislikedByUser = true;
      }
    });
  }

  dislike(comment: MyComment): void {
    this.offersService.dislike(comment.id, Number(localStorage.getItem('userId'))).subscribe(() => {
      if (comment.isLikedOrDislikedByUser === false) {
        comment.disLikes = comment.disLikes - 1;
        comment.isLikedOrDislikedByUser = null;
      }
      else if (comment.isLikedOrDislikedByUser === true) {
        comment.disLikes = comment.disLikes + 1;
        comment.likes = comment.likes - 1;
        comment.isLikedOrDislikedByUser = false;
      }
      else if (comment.isLikedOrDislikedByUser === null) {
        comment.disLikes = comment.disLikes + 1;
        comment.isLikedOrDislikedByUser = false;
      }
    });
  }

  changePage(number: number): void {
    this.page = this.page + number;
    this.panelOpenState = false;
    this.refreshOffers();
  }

  leaveFavourites() {
    this.isFavourites = false;
    this.page = 1;
    this.refreshOffers();
  }

  private refreshOffers(): void {
    const county = Number(localStorage.getItem('userLocalCountyId'));
    this.countyId = county ? county : Number(localStorage.getItem('userProfileCountyId'));
    this.offersService.getAllOffers(this.countyId, this.search, this.categoryId, this.page, this.pageSize).subscribe((value) => {
      this.offers = value.offers;
      this.totalSites = Math.ceil(value.count / this.pageSize);
    });
  }
}