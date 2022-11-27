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
						className={`${s.footer__office_item} ${s.footer__office_item__tagan}`}
					>
						<div className={s.footer__office_text}>
							<p className={s.footer__office_title}>
								Офис в Таганроге
							</p>
							<p className={s.footer__office_address}>
								Петровская улица, 89Б
							</p>
						</div>
					</div>
					<div
						className={`${s.footer__office_item} ${s.footer__office_item__rostov}`}
					>
						<div className={s.footer__office_text}>
							<p className={s.footer__office_title}>
								Офис в Ростове-на-Дону
							</p>
							<p className={s.footer__office_address}>
								Нижнебульварная ул., 6
							</p>
						</div>
					</div>
				</div>
				<div className={s.footer__contact_block}>
					<span
						className={s.footer__number}
						href="tel:+7 495 587_41_27"
					>
						Тех. поддержка:
					</span>
					<p className={s.footer__email}>service@oggettoweb.com</p>
				</div>
			</div>
		</footer>
	);
};

export default Header;
