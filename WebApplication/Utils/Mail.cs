using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace WebApplication.Utils
{
    public class Mail
    {
        public static void Send(String To, String Message, bool isM)
        {
            // отправитель - устанавливаем адрес и отображаемое в письме имя
            MailAddress from = new MailAddress("bitmarket.info@gmail.com", "BitMarket");
            if (!isM)
            {
                Message = "Здравствуйте, ваш заказ оформлен.<br>Список товаров:<br>" + Message;
            }
            // кому отправляем
            MailAddress to = new MailAddress(To); //To
            // создаем объект сообщения
            MailMessage m = new MailMessage(from, to);
            // тема письма
            if (!isM)
            {
                m.Subject = "Ваш чек";
                // текст письма
                m.Body = "<h2>Интернет-магазин</h2>" + "<br><br>" + Message;
                // письмо представляет код html
            }
            else
            {
                m.Subject = "Отзыв";
                m.Body = Message;
            }
            m.IsBodyHtml = true;
            // адрес smtp-сервера и порт, с которого будем отправлять письмо
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            // логин и пароль
            smtp.Credentials = new NetworkCredential("bitmarket.info@gmail.com", "bitmarket2020");
            smtp.EnableSsl = true;
            smtp.Send(m);
        }
    }
}