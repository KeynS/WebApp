using DataAccess;
using DataAccess.Entities;
using Services.Base;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class DefaultService
        : IDefaultService
    {

        private Context _context = null;
        private string Test;

        public DefaultService()
        {
            _context = new Context();
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users.ToArray();
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToArrayAsync();
        }

        public bool AddUser(User User)
        {
            try {
                _context.Users.Add(User);
                _context.SaveChanges();

                return true;
            } catch (Exception ex){
                return false;
            }
        }


        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products.ToArrayAsync();
        }

        public User GetUser(Func<User, bool> func)
        {
            return _context.Users.FirstOrDefault(func);
        }


        public Product GetProduct(Func<Product, bool> func)
        {
            return _context.Products.FirstOrDefault(func);
        }

        public IEnumerable<User> GetUsers(Func<User, bool> func)
        {
            if (func == null)
                return  _context.Users.ToArray();

            return _context.Users.Where(func).ToArray();
        }

        public IEnumerable<Log> GetLogs()
        {
            return _context.Logs.ToArray();
        }

        public IEnumerable<Log> GetLogs(Func<Log, bool> func)
        {
            if (func == null)
                return _context.Logs.ToArray();

            return _context.Logs.Where(func).ToArray();
        }

        public IEnumerable<Product> GetProducts()
        {
            return _context.Products.ToArray();
        }

        public IEnumerable<Product> GetProducts(Func<Product, bool> func)
        {
            if (func == null)
                return _context.Products.ToArray();

            return _context.Products.Where(func).ToArray();
        }


        public bool AddProduct(Product Product)
        {
            try
            {
                _context.Products.Add(Product);
                _context.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IEnumerable<Category> GetCategories()
        {
            return _context.Categories.ToArray();
        }

        public IEnumerable<Category> GetCategories(Func<Category, bool> func)
        {
            if (func == null)
                return _context.Categories.ToArray();

            return _context.Categories.Where(func).ToArray();
        }

        //NumberOfPurchases

        public IEnumerable<NumberOfPurchases> GetNumberOfPurchases()
        {
            return _context.NumberOfPurchases.ToArray();
        }

        public IEnumerable<NumberOfPurchases> GetNumberOfPurchases(Func<NumberOfPurchases, bool> func)
        {
            if (func == null)
                return _context.NumberOfPurchases.ToArray();

            return _context.NumberOfPurchases.Where(func).ToArray();
        }

        public bool Save()
        {
            try { 
                _context.SaveChanges();
                return true;
            } catch (Exception ex)
            {
                return false;
            }
        }
    }
}
