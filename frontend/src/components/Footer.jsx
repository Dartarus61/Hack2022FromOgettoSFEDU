import React from "react";
import { Link } from "react-router-dom";
import s from "../styles/components/footer.module.scss";
import logo from "../assets/logo.png";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Header = ({ isGray = false, children }) => {
	const { user, signout } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<footer className={s.footer}>
			<div className={s.footer__container}>
				<div className={s.footer__offices_block}>
					<div
						className={
							(s.footer__office_item,
							s.footer__office_item__tagan)
						}
					>
						<div className={s.footer__office_text}>
							<p className={s.footer__office_title}>
								Office in Taganrog
							</p>
							<p className={s.footer__office_address}>
								89B Petrovskaya street, Andreevsky mall
							</p>
						</div>
					</div>
					<div
						className={
							(s.footer__office_item,
							s.footer__office_item__rostov)
						}
					>
						<div className={s.footer__office_text}>
							<p className={s.footer__office_title}>
								Office in Rostov_on_Don
							</p>
							<p className={s.footer__office_address}>
								6 Nizhnebulvarnaya street, "5 Seas" business
								centre
							</p>
						</div>
					</div>
				</div>
				<div className={s.footer__contact_block}>
					<a className={s.footer__number} href="tel:+7 495 587_41_27">
						+7 495 587_41_27
					</a>
					<p className={s.footer__email}>hello@oggettoweb.com</p>
					<p className={s.footer__copyright}>
						© Oggetto, 2008–2022. Online stores and selling
						applications.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Header;
