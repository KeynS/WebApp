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
    [Table("users")]
    public class User :
        BaseIdEntity
    {

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public int Spent { get; set; }

        [Required]
        public int Bonus { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        [Column("activated")]
        public bool IsActivated { get; set; }

        public int? Code { get; set; }

    }
}
