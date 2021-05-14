using DataAccess.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Entities
{
    [Table("log")]
    public class Log
        : BaseIdEntity
    {
        [Required]
        public int Count { get; set; }

        [Required]
        [Column("product_id")]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }


        [Required]
        [Column("users_id")]
        public int UsersId { get; set; }

        [ForeignKey("UsersId")]
        public virtual User User { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
